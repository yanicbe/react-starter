import { ErrorEntity } from "@/lib/utils/error-entities";
import { Error as ErrorI } from "@/util-components/root/context";

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
    errorMessage = "403 - Du scheinst nicht die nötigen Rechte zu haben. Bitte kontaktiere den Support oder Ihren Vereinsadministrator.";
  } else if (res.status === 500) {
    errorMessage = "500 - Es ist ein Fehler aufgetreten, der nicht auftreten soll. Bitte schreibe dem Support. - Zeitpunkt: " + new Date().toLocaleString();
  } else if (res.status === 404) {
    errorMessage = "404 - das Objekt wurde nicht gefunden. Bitte versuche es später nochmals oder kontaktiere den Support";
  } else {
    errorMessage = `${res.status} - Es ist ein Fehler aufgetreten. Bitte versuche es später nochmals oder kontaktiere den Support`;
  }

  if (error.error === ErrorEntity.NoUserFoundForbidden) {
    errorLocation = "/";
    error.entity = ErrorEntity.NoUserFoundForbidden;
    redirect = true;
  } else if (error.error === ErrorEntity.EMailNotVerifiedForbidden) {
    errorLocation = "/verification/mail";
    error.entity = ErrorEntity.EMailNotVerifiedForbidden;
    redirect = true;
  } else if (error.error === ErrorEntity.NoOrganizationForbidden) {
    errorLocation = "/vereine/create";
    error.entity = ErrorEntity.NoOrganizationForbidden;
    redirect = true;
  } else if (error.message === "Team is getting used") {
    errorMessage = "Das Team hat bereits Spieler zugewiesen. Entferne alle zugewiesenen Spieler und versuche es erneut.";
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