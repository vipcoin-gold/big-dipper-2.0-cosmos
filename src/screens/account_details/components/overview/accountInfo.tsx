import { Translate } from 'next-translate';

export type accountInfoReturnType = {
  title: any;
  value: string;
  isDetail?: boolean;
  thisHash?: boolean;
};

export type accountInfoType = (
  data: any,
  t: Translate
) => accountInfoReturnType[];

export const accountInfo: accountInfoType = (accountData, t) => [
  {
    title: t('balanceHead'),
    value: accountData.totalWalletsBalance
      ? `${accountData.totalWalletsBalance} OVG`
      : '0 OVG',
  },
  {
    title: t('kindHead'),
    value: accountData.kind,
  },
  {
    title: t('accountAddressHead'),
    value: accountData.address,
    isDetail: true,
  },
  {
    title: t('stateHead'),
    value: accountData.state,
  },
  {
    title: t('hashHead'),
    value: accountData.hash,
    thisHash: true,
  },
];
