import { auth, currentUser } from '@clerk/nextjs';
import { ACTION, ENTITY_TYPE } from '@prisma/client';

import { db } from '@/lib/db';

interface Props {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}

export const createAuditLog = async (props: Props) => {
  try {
    const { orgId } = auth();
    const user = await currentUser();

    if (!user || !orgId) {
      throw new Error('User not found');
    }

    const { entityId, entityType, entityTitle, action } = props;

    // Log the user object to inspect its structure
    console.log('Clerk User Object:', user);
    console.log(user?.emailAddresses[0]?.emailAddress);

    const email = user?.emailAddresses[0].emailAddress;

    await db.auditLog.create({
      data: {
        orgId,
        entityId,
        entityType,
        entityTitle,
        action,
        userId: user.id,
        userImage: user?.imageUrl,
        userName:
          user?.firstName + ' ' + user?.lastName || user?.username || email,
      },
    });
  } catch (error) {
    console.log('[AUDIT_LOG_ERROR]', error);
  }
};
