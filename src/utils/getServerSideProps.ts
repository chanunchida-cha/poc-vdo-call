import { type NextApiRequest, type NextApiResponse } from "next";
import Cookie from "cookie-universal";
import { type User } from "../models/interface/InterfaceUser";

interface ExtendedReq extends NextApiRequest {
  user: User;
}

interface ServerProps {
  req: ExtendedReq;
  res: NextApiResponse;
}

const getServerSideProps = async ({ req, res }: ServerProps) => {
  // ADD YOUR CUSTOM `getServerSideProps` code here
  const data = req.cookies.user;
  const user = JSON.parse(data!);
  if (user) {
    return { props: { user: user } };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
};

export default getServerSideProps;
