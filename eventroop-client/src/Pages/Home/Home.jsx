import React from "react";
import { useAuth } from "../../components/AuthContext";
import Loading from "../../components/Loading";

function Home() {
  const { user, userLoading } = useAuth();
  if (userLoading) {
    return (
      <Loading/>
    );
  }
  return <div>homegfd {user?.email}</div>;
}

export default Home;
