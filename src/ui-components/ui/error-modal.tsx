import { Context } from "@/page-components/root/context";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./dialog";

const ErrorModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { error, setError } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const [rerenderInvite, setRerenderInvite] = useState<boolean>();
  const { logout } = useAuth0();

  const onClose = (withoutReload?: boolean) => {
    setIsOpen(false);
    if (setError) {
      setError(undefined);
    }
    if (withoutReload === undefined || withoutReload) {
      return;
    } else {
      window.location.reload();
    }
  };

  useEffect(() => {
    if (error) {
      if (error.location.redirect) {
        setRerenderInvite(true);
        navigate(error.location.path + (error.mail ? `?mail=${error.mail}` : ""));
        setIsOpen(false);
        setError && setError(undefined);
      } else {
        setIsOpen(true);
        setRerenderInvite(true);
      }
    }
  }, [error, navigate, setError]);

  useEffect(() => {
    if (!error && isOpen) {
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    if (rerenderInvite) {
      setRerenderInvite(undefined);
    }
  }, [rerenderInvite]);

  const logOut = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <>
      {error && (
        <Dialog
          open={isOpen}
          onOpenChange={(value) => {
            setIsOpen(value);
            if (value === false) {
              onClose(!error.withReload);
            }
          }}
        >
          <DialogContent
            onInteractOutside={(e) => {
              if (error.isClosable === false) {
                e.preventDefault();
                return;
              }
              onClose(!error.withReload);
            }}
            isClosable={error.isClosable}
          >
            <DialogHeader>
              <DialogTitle>{error.title}</DialogTitle>
            </DialogHeader>
            <div>
              <p>{error.message}</p>
            </div>
            <DialogFooter>
              <div className={`flex gap-3 w-full`}>
                {error.isClosable && (
                  <>
                    <Button
                      className={error.location ? "grow" : ""}
                      variant="outline"
                      onClick={() => onClose(!error.withReload)}
                    >
                      Schließen
                    </Button>
                  </>
                )}
                {error.location.path && (
                  <>
                    {error.location.path === "/login" ? (
                      <Button className="grow" onClick={() => logOut()}>{`Ausloggen`}</Button>
                    ) : (
                      <Link to={error.location.path} className="grow flex">
                        <Button className="grow" onClick={() => onClose(true)}>{`${error.entity}`}</Button>
                      </Link>
                    )}
                  </>
                )}
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ErrorModal;
