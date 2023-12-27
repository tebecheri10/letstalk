"use client";

import { useSession } from "next-auth/react";

const Profile = () => {
  const session = useSession();

  if (session.data?.user) {
    return (
      <div>
        <h2>profile</h2>
        <p>{session.data?.user.name}</p>
        <p>{session.data?.user.email}</p>
      </div>
    );
  }
};

export default Profile;