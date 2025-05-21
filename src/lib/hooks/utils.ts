import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalizeFirstLetter = (string: string) => {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
};

export const formatTimeSpent = (startDate: string): string => {
  const start = new Date(startDate);
  const now = new Date();

  const diff = now.getTime() - start.getTime();

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

  if (years > 0) {
    return `${years} Jahr${years > 1 ? "e" : ""}`;
  } else if (days > 0) {
    return `${days} Tag${days > 1 ? "e" : ""}`;
  } else if (hours > 0) {
    return `${hours} Std.${hours > 1 ? "" : ""}`;
  } else {
    return `${minutes} Minute${minutes > 1 ? "s" : ""}`;
  }
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    // Handle invalid date
    return "Invalid Date";
  }
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short" };
  return date.toLocaleDateString("en-US", options);
};

export const formatDateDetail = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    // Handle invalid date
    return "Invalid Date";
  }
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("de", options);
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    // Handle invalid date
    return "Invalid Date";
  }
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric" };
  return date.toLocaleDateString("de", options);
};


export const downloadURI = (uri: string, name: string) => {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const parseRoles = (role: string) => {
  switch (role) {
    case "ADMIN":
      return "Administrator";
    case "USER":
      return "Mitarbeiter";
    case "SUPER_ADMIN":
      return "Super Administrator";
    default:
      return role;
  }
}

export const parseStatus = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "Aktiv";
    case "INACTIVE":
      return "Inaktiv";
    case "PENDING":
      return "In Bearbeitung";
    case "NEW":
      return "Neu";
    case "FEEDBACK":
      return "Feedback";
    case "DONE":
      return "Erledigt";
    default:
      return status;
  }
}
