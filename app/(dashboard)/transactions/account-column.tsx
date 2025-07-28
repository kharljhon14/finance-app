import { useOpenAccount } from '@/features/accounts/hooks/use-open-account';

interface Props {
  account: string;
  accountId: string;
}

export default function AccountColumn({ account, accountId }: Props) {
  const { onOpen } = useOpenAccount();

  const onClick = () => {
    onOpen(accountId);
  };

  return (
    <div
      onClick={onClick}
      className="flex items-center cursor-pointer hover:underline"
    >
      {account}
    </div>
  );
}
