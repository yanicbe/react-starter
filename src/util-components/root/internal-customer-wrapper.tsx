import { UserInfoUserType } from "@/lib/api/interfaces/user-profile.interface";
import { useUserProfileuserinfoQuery } from "@/lib/api/requests/user-profile.requests";
import { SuspenseWrapper } from "@/ui-components/ui/suspense-wrapper";
import React from "react";
import { UnauthorizedAccess } from "./protected-route";

const InternalCustomerWrapper = ({
  internalComponent,
  customerComponent,
}: {
  internalComponent?: React.ReactNode;
  customerComponent?: React.ReactNode;
}) => {
  const { data: userProfile } = useUserProfileuserinfoQuery();
  const isInternal = userProfile?.userType === UserInfoUserType.INTERNAL;

  const internal = internalComponent || <UnauthorizedAccess />;
  const customer = customerComponent || <UnauthorizedAccess />;

  return (
    <SuspenseWrapper type="green" text="Lädt dein Profil...">
      {isInternal ? internal : customer}
    </SuspenseWrapper>
  );
};

export default InternalCustomerWrapper;
