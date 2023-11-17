import { ReactNode } from 'react';

import { OrgControl } from './_components/org-control';

const OrganizationIdLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <OrgControl />
      {children}
    </div>
  );
};
export default OrganizationIdLayout;
