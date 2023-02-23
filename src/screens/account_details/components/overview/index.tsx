import React from 'react';
import classnames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import { Typography, Dialog } from '@material-ui/core';

import { useScreenSize } from '@hooks';

import CopyIcon from '@assets/icon-copy.svg';
import ShareIcon from '@assets/icon-share.svg';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import { Box } from '@components';
import { useStyles } from './styles';
import { useOverview } from './hooks';
import { isEmpty } from 'lodash';
import { walletInfo } from './walletInfo';
import { ShareInfo } from './Share';
import { accountInfo } from './accountInfo';
import Link from 'next/link';
import { ACCOUNT_DETAILS, TRANSACTION_DETAILS } from '@utils/go_to_page';
import { Accordion } from '../accordion/accordion';

const Overview: React.FC<{
  className?: string;
  withdrawalAddress: string;
  address: string;
  accountData: any;
}> = ({ className, address, withdrawalAddress, accountData }) => {
  const { isDesktop } = useScreenSize();
  const classes = useStyles();
  const { t } = useTranslation('accounts');
  const {
    open,
    addressSelected,
    handleClose,
    handleOpen,
    handleCopyToClipboard,
  } = useOverview(t);

  return (
    <>
      <ShareInfo
        address={addressSelected}
        open={open}
        handleClose={handleClose}
      />
      <Box className={classnames(className, classes.root)}>
        {!isEmpty(accountData.walletOverview) && (
          <div className={classnames(classes.list)}>
            {walletInfo(accountData.walletOverview, t).map(walletItem => (
              <div
                key={walletItem.title}
                className={classnames(
                  classes.copyText,
                  classes.item,
                  classes.walletsItem
                )}
              >
                <Typography variant="body1" className="label">
                  <strong>{walletItem.title}</strong>
                </Typography>
                <div className="detail">
                  {walletItem.isDetail && (
                    <>
                      <CopyIcon
                        onClick={() => handleCopyToClipboard(walletItem.value)}
                        className={classes.actionIcons}
                      />
                      <ShareIcon
                        onClick={() => handleOpen(walletItem.value)}
                        className={classes.actionIcons}
                      />
                    </>
                  )}
                  <Typography variant="body1" className="value">
                    {walletItem.isDetail ? (
                      <Link href={ACCOUNT_DETAILS(walletItem.value)} passHref>
                        {!isDesktop
                          ? getMiddleEllipsis(walletItem.value, {
                              beginning: 15,
                              ending: 5,
                            })
                          : walletItem.value}
                      </Link>
                    ) : (
                      walletItem.value
                    )}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        )}
        {!isEmpty(accountData.accountOverview) && (
          <>
            <div className={classnames(classes.list)}>
              {accountInfo(accountData.accountOverview, t).map(accountItem => (
                <div
                  key={accountItem.title}
                  className={classnames(classes.copyText, classes.item)}
                >
                  <Typography variant="body1" className="label">
                    <strong>{accountItem.title}</strong>
                  </Typography>
                  <div className="detail">
                    {accountItem.isDetail && (
                      <>
                        <CopyIcon
                          onClick={() =>
                            handleCopyToClipboard(accountItem.value)
                          }
                          className={classes.actionIcons}
                        />
                        {!accountItem.thisHash && (
                          <ShareIcon
                            onClick={() => handleOpen(accountItem.value)}
                            className={classes.actionIcons}
                          />
                        )}
                      </>
                    )}

                    <Typography variant="body1" className="value">
                      {accountItem.isDetail ? (
                        <Link href={ACCOUNT_DETAILS(accountItem.value)}>
                          {!isDesktop
                            ? getMiddleEllipsis(accountItem.value, {
                                beginning: 15,
                                ending: 5,
                              })
                            : accountItem.value}
                        </Link>
                      ) : !isDesktop && accountItem.thisHash ? (
                        getMiddleEllipsis(accountItem.value, {
                          beginning: 15,
                          ending: 5,
                        })
                      ) : (
                        accountItem.value
                      )}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
            <div className={classes.accordionContainer}>
              {!isEmpty(accountData.accountOverview.affiliates) && (
                <Accordion
                  data={accountData.accountOverview.affiliates}
                  headTitle={t('affiliatesHead')}
                  options={{
                    itemsOne: 'address',
                    itemsTwo: 'kind',
                    itemsOneTitle: t('address'),
                    itemsTwoTitle: t('affiliation'),
                  }}
                />
              )}
              {!isEmpty(accountData.accountOverview.wallets) && (
                <Accordion
                  data={accountData.accountOverview.wallets}
                  headTitle={t('walletsHead')}
                />
              )}
            </div>
          </>
        )}
      </Box>
    </>
  );
};

export default Overview;
