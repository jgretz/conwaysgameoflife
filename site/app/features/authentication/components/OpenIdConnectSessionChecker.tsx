import React, {RefObject} from 'react';
import {compose, withEffect, withRef, withCallback} from '@truefit/bach';
import {withSelector} from '@truefit/bach-redux';
import {withHistory, withLocation} from '@truefit/bach-react-router';
import {History, Location} from 'history';
import {currentUserSelector} from '../selectors';
import {UserIdentity} from '../types';

type Props = {
  history: History;
  location: Location;
  currentUser: UserIdentity;
  iframe: RefObject<HTMLIFrameElement>;
  messageReceived: (e: Event) => void;
};

const OpenIdConnectSessionChecker = ({currentUser, iframe}: Props) =>
  currentUser?.openIdConnectCheckSessionUrl ? (
    <iframe
      title="OpenId Connect Session Check"
      ref={iframe}
      src={currentUser.openIdConnectCheckSessionUrl}
      height={0}
      width={0}
      style={{display: 'none', border: 'none'}}
    />
  ) : null;

const messageReceived = ({history, location, currentUser, iframe}: Props) => (e: MessageEvent) => {
  if (
    e.origin === currentUser?.openIdConnectServerOrigin &&
    e.source === iframe.current?.contentWindow &&
    e.data === 'changed'
  ) {
    history.push('/sign-out?localOnly=true', {referrer: location});
  }
};

const addMessageListener = ({messageReceived}: Props) => {
  window.addEventListener('message', messageReceived);

  return () => window.removeEventListener('message', messageReceived);
};

const configureMessagePostToOP = ({currentUser, iframe}: Props) => {
  if (!currentUser?.openIdConnectServerOrigin || !iframe.current) return;

  const interval = setInterval(() => {
    iframe.current.contentWindow.postMessage(
      `${currentUser.openIdConnectClientId} ${currentUser.openIdConnectSessionState}`,
      currentUser.openIdConnectServerOrigin,
    );
  }, 10000);

  // eslint-disable-next-line consistent-return
  return () => clearInterval(interval);
};

export default compose(
  withHistory(),
  withLocation(),

  withSelector('currentUser', currentUserSelector),

  withRef('iframe', null),

  withCallback('messageReceived', messageReceived, ['currentUser']),

  withEffect(addMessageListener, ['messageReceived']),
  withEffect(configureMessagePostToOP, ['currentUser']),
)(OpenIdConnectSessionChecker);
