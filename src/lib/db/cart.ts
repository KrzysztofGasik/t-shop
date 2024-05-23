import { prisma } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { Cart, CartItem, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

export type ShoppingCart = CartWithProducts & {
  size: number;
  subtotal: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
  const session = await getServerSession(authOptions);
  let cart: CartWithProducts | null;

  if (session) {
    cart = await prisma.cart.findFirst({
      where: { userId: session.user.id },
      include: { items: { include: { product: true } } },
    });
  } else {
    const localCartId = cookies().get("localCartId")?.value;
    cart = localCartId
      ? await prisma.cart.findUnique({
          where: { id: localCartId },
          include: { items: { include: { product: true } } },
        })
      : null;
  }

  if (!cart) {
    return null;
  }
  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    ),
  };
}

export async function createCart(): Promise<ShoppingCart> {
  const session = await getServerSession(authOptions);
  let newCart: Cart;

  if (session) {
    newCart = await prisma.cart.create({
      data: {
        userId: session.user.id,
      },
    });
  } else {
    newCart = await prisma.cart.create({
      data: {},
    });
    cookies().set("localCartId", newCart.id); // encrypt
  }

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
}

export async function mergeAnonymousAndUserCart(userId: string) {
  const localCartId = cookies().get("localCartId")?.value;
  const localCart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: { items: true },
      })
    : null;

  if (!localCart) return;

  // find user cart
  const userCart = await prisma.cart.findFirst({
    where: { userId },
    include: { items: true },
  });

  //   transaction
  await prisma.$transaction(async (tx) => {
    // fetch user cart
    if (userCart) {
      const mergedCartItems = mergeCartItems(localCart.items, userCart.items);

      // delete user cart
      await tx.cartItem.deleteMany({
        where: {
          cartId: userCart.id,
        },
      });

      await tx.cart.update({
        where: { id: userCart.id },
        data: {
          items: {
            createMany: {
              data: mergedCartItems.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });
    } else {
      // create cart because user cart does not exist
      await tx.cart.create({
        data: {
          userId,
          items: {
            createMany: {
              data: localCart.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });
    }

    // delete local cart
    await tx.cart.delete({
      where: {
        id: localCart.id,
      },
    });

    // delete cookies for local cart because it's merged
    cookies().set("localCartId", "");
  });
}

function mergeCartItems(...cartItems: CartItem[][]) {
  return cartItems.reduce((acc, items) => {
    items.forEach((item) => {
      const itemExist = acc.find((i) => i.productId === item.productId);
      if (itemExist) {
        itemExist.quantity += item.quantity;
      } else {
        acc.push(item);
      }
    });
    return acc;
  }, [] as CartItem[]);
}
