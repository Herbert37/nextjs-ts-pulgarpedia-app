import { useEffect, useState } from "react";
import { AppBar, Button, Container, Toolbar } from "@mui/material";

export default function Menu() {
  const [scrollY, setScrollY] = useState<number>(0); // Explicitly typed as number
  const [showLoginButton, setShowLoginButton] = useState<boolean>(false);
  const [showLogoutButton, setShowLogoutButton] = useState<boolean>(false);
  const [balance, setBalance] = useState(null);
  const [lmNumber, setLmNumber] = useState<string>("");
  const [statusElite, setStatusElite] = useState<string>("");
  const [lmName, setLmName] = useState<string>("");
  const [showBalance, setShowBalance] = useState<boolean>(false);
  const [showLmNumber, setShowLmNumber] = useState<boolean>(false);
  const [showStatusElite, setShowStatusElite] = useState<boolean>(false);
  const [showLmName, setShowLmName] = useState<boolean>(false);

  const appBarStyle: React.CSSProperties = {
    backgroundColor: scrollY > 100 ? "#121212" : "rgba(0, 0, 0, 0.6)",
    transition: "background-color 0.3s ease-in-out",
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const getCookie = (name: string): string | null => {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      return match ? decodeURIComponent(match[2]) : null;
    };

    if (typeof window === "undefined") return;
    console.log("Verificando sesion...");

    const waitForLogin = setInterval(() => {
      if (getCookie("userinfo") && getCookie("access_token")) {
        if (typeof window.lmFetchWrapper === "function") {
          console.log("Sesion detectada, preparando lmFetchWrapper.");
          setShowLoginButton(false);
          setShowLogoutButton(true);
          clearInterval(waitForLogin);
          getBalance();
        } else {
          console.log("lmFetchWrapper aún no disponible...");
        }
      } else if (typeof window.lmLogin === "function") {
        setShowLoginButton(true);
        setShowLogoutButton(false);
      }
    }, 100);

    // Cleanup
    return () => clearInterval(waitForLogin);
  }, []);

  const handleLogin = () => {
    const loginLanguage = "en";
    const isPopupLogin = true;
    window.lmLogin?.(loginLanguage, isPopupLogin, {
      onSuccess: async () => {
        await getBalance();
      },
      onError: (error) => {
        alert("Login error.");
        console.log({ LoginError: error });
      },
    });
  };

  const handleLogout = () => window.lmLogout?.();

  async function getBalance() {
    try {
      const response = await window.lmFetchWrapper?.("lmBalance");
      if (response && response.ok) {
        console.log({ getBalanceResponse: response });
        const data = await response.json();
        const lmSummary = data?.summarization?.find(
          (item: { type: string; amount?: number }) => item.type === "LM"
        );
        const balance = lmSummary?.amount || 0;
        setBalance(balance.toLocaleString());
        setShowBalance(true);
      }
      getMemberProfile();
    } catch (error) {
      console.error({ getBalanceError: error });
    }
  }

  async function getMemberProfile() {
    try {
      const response = await window.lmFetchWrapper?.("memberProfile");
      if (response && response.ok) {
        console.log({ getMemberProfileResponse: response });
        const data = await response.json();
        if (
          data?.memberProfileDetails?.memberAccount?.memberProfile
            ?.membershipNumber
        ) {
          setLmNumber(
            data?.memberProfileDetails?.memberAccount?.memberProfile
              ?.membershipNumber
          );
          setShowLmNumber(true);
        }
        if (
          data?.memberProfileDetails?.memberAccount?.memberProfile
            ?.individualInfo?.givenName
        ) {
          setLmName(
            data?.memberProfileDetails?.memberAccount?.memberProfile
              ?.individualInfo?.givenName
          );
          setShowLmName(true);
        }
      }
      getEliteProgram();
    } catch (error) {
      console.error({ getMemberProfileError: error });
    }
  }

  async function getEliteProgram() {
    try {
      const response = await window.lmFetchWrapper?.("eliteProgram");
      if (response && response.ok) {
        console.log({ getEliteProgramResponse: response });
        const data = await response.json();
        if (data?.eliteStatus?.cenitStatus) {
          setStatusElite(data?.eliteStatus?.cenitStatus);
          setShowStatusElite(true);
        }
      }
    } catch (error) {
      console.error({ getEliteProgramError: error });
    }
  }

  return (
    <AppBar sx={appBarStyle} position='sticky'>
      <Toolbar>
        <Container maxWidth='lg' sx={{ padding: "0rem !important" }}>
          {showLoginButton && (
            <Button
              variant='outlined'
              color='secondary'
              onClick={() => handleLogin()}
            >
              Login
            </Button>
          )}
          {showLogoutButton && (
            <Button
              variant='outlined'
              color='secondary'
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
          )}
          {showLmName && (
            <Button disabled color='inherit'>
              Hello, {lmName}{" "}
            </Button>
          )}
          {showLmNumber && (
            <Button disabled color='inherit'>
              LM Number: {lmNumber}{" "}
            </Button>
          )}
          {showStatusElite && (
            <Button disabled color='inherit'>
              Status Elite: {statusElite}{" "}
            </Button>
          )}
          {showBalance && (
            <Button disabled color='inherit'>
              Balance: {balance} miles
            </Button>
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
}
