"use client";

import { Session } from "next-auth";
import Image from "next/image";
import { IconButton, Tooltip } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { signIn, signOut } from "next-auth/react";
import classes from "./user-menu-button.module.css";

interface UserMenuButtonProps {
  session: Session | null;
}

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const user = session?.user;
  return (
    <>
      {user ? (
        <Image
          src={user?.image || `/profile_picture.png`}
          width={40}
          height={40}
          alt="profile picture"
          className={classes.profilePicture}
        />
      ) : null}
      <IconButton aria-label="user-menu" sx={{ margin: "0 .5rem" }}>
        {user ? (
          <Tooltip title="Log out" arrow>
            <LogoutIcon onClick={() => signOut({ callbackUrl: "/" })} />
          </Tooltip>
        ) : (
          <Tooltip title="Log in" arrow>
            <LoginIcon onClick={() => signIn()} />
          </Tooltip>
        )}
      </IconButton>
    </>
  );
}
