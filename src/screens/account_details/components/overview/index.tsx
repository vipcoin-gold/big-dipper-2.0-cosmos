import CopyIcon from '@assets/icon-copy.svg';
import ShareIcon from '@assets/icon-share.svg';

import { Box } from '@components';

import { useScreenSize } from '@hooks';

import { Typography, Dialog } from '@material-ui/core';

import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import { ACCOUNT_DETAILS, ACCOUNT_HASH } from '@utils/go_to_page';

import React from 'react';

import classnames from 'classnames';

import useTranslation from 'next-translate/useTranslation';

import { isEmpty } from 'lodash';

import Link from 'next/link';

import AccountDetailsTab from '../accountDetailsTab';

import { ShareInfo } from './Share';
import { accountInfo } from './accountInfo';
import { useOverview } from './hooks';
import { useStyles } from './styles';
import { walletInfo } from './walletInfo';
import { tabLabels } from '@src/screens/account_details/utils';

const Overview: React.FC<{
  className?: string;
  accountData: any;
}> = ({ className, accountData }) => {
  const { isDesktop,isXlDesktop } = useScreenSize();
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
      {/* <Box className={classnames(className, classes.root)}> */}
      {!isEmpty(accountData.walletOverview) && (
        <Box className={classnames(className, classes.root)}>
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
        </Box>
      )}
      {!isEmpty(accountData.accountOverview) && (
        <>
          <Box className={classnames(className, classes.root)}>
            <div className={classnames(classes.listAccount)}>
              {accountInfo(accountData.accountOverview, t).map(accountItem => (
                <div
                  key={accountItem.title}
                  className={classnames(
                    classes.copyText,
                    classes.item,
                  )}
                >
                  <Typography variant="body1" className="label">
                    <strong>{accountItem.title}</strong>
                  </Typography>
                  <div className="detail">
                    {(accountItem.isDetail || accountItem.thisHash) && (
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
                          {!isXlDesktop
                            ? getMiddleEllipsis(accountItem.value, {
                                beginning: 15,
                                ending: 5,
                              })
                            : accountItem.value}
                        </Link>
                      ) : accountItem.thisHash ? (
                        <Link href={ACCOUNT_HASH(accountItem.value)}>
                          {!isXlDesktop
                            ? getMiddleEllipsis(accountItem.value, {
                                beginning: 15,
                                ending: 5,
                              })
                            : accountItem.value}
                        </Link>
                      ) : (
                        accountItem.value
                      )}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </Box>

          <AccountDetailsTab data={accountData.accountOverview} tabLabelsHead={tabLabels}/>
        </>
      )}
      {/* </Box> */}
    </>
  );
};

export default Overview;
