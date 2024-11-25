import { ErrorEntity, Error as ErrorI } from "@/page-components/root/context";

export const getErrorMessage = async (res: Response) => {
  let errorMessage = "";
  let errorLocation = "";
  let error: ErrorI;
  let isClosable = true;
  let withReload = false;
  let title = "Es ist ein Fehler aufgetreten";
  let redirect = false;

  try {
    error = (await res.json()) as ErrorI;
  } catch {
    throw new Error("Failed to parse JSON");
  }

  if (!error) {
    throw new Error("Failed to parse JSON");
  }

  if (res.status === 400) {
    errorMessage = "400 - Scheinbar scheinen Ihre Angaben nicht ganz korrekt zu sein. Bitte korrigiere das und versuche es nochmals.";
  } else if (res.status === 409) {
    errorMessage = "409 - Scheinbar gab es einen Konflikt. Bitte versuche es später nochmals oder kontaktiere den Support.";
  } else if (res.status === 403) {
    errorMessage = "403 - Du scheinst nicht die nötigen Rechte zu haben. Bitte kontaktiere den Support oder Ihren Organisationsadministrator.";
  } else if (res.status === 500) {
    errorMessage = "500 - Es ist ein Fehler aufgetreten, der nicht auftreten soll. Bitte schreibe dem Support. - Zeitpunkt: " + new Date().toLocaleString();
  } else if (res.status === 404) {
    errorMessage = "404 - das Objekt wurde nicht gefunden. Bitte versuche es später nochmals oder kontaktiere den Support";
  } else {
    errorMessage = `${res.status} - Es ist ein Fehler aufgetreten. Bitte versuche es später nochmals oder kontaktiere den Support`;
  }

  if (error.error === ErrorEntity.NoOrganizationForbidden) {
    errorLocation = "/register/info";
    error.entity = ErrorEntity.NoOrganizationForbidden;
    redirect = true;
  } else if (error.error === ErrorEntity.UserForbidden) {
    errorLocation = "/";
    error.entity = ErrorEntity.UserForbidden;
    redirect = true;
  }

  const parsedError: ErrorI = {
    message: errorMessage,
    error: error.error,
    statusCode: res.status,
    entity: error.entity,
    location: {
      path: errorLocation,
      redirect,
    },
    isClosable,
    withReload,
    title,
    mail: error.mail,
  };

  return parsedError
}