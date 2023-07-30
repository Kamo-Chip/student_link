import Navigation from "@/components/ui_elements/Navigation";
import layoutStyles from "@/styles/layouts/layout.module.css";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <main className={layoutStyles.container}>{children}</main>
      {(router.pathname.split("/")[1] == "candidates" ||
        router.pathname.split("/")[1] == "companies") &&
      router.pathname.split("/")[2] != "onboard" ? (
        <Navigation />
      ) : null}
    </>
  );
};

export default Layout;
