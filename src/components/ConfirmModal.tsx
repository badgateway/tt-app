import React, {Dispatch, SetStateAction} from 'react';
import Modal from 'react-modal';

type ConfirmModalProps = {
  acceptAction?: () => Promise<void>;
  acceptAria?: string;
  acceptLabel?: string;
  closeAction: Dispatch<SetStateAction<boolean>>;
  declineAction?: () => Promise<void>;
  declineAria?: string;
  declineLabel?: string;
  isOpen: boolean;
  message: string;
  renderDecline?: boolean; //renders second button to decline
};
export function ConfirmModal(props: ConfirmModalProps) {
  return (
    <Modal
      className='confirm-modal'
      contentLabel='Example Modal'
      isOpen={props.isOpen}
      onRequestClose={() => props.closeAction(false)}
    >
      <p>{props.message}</p>
      <button
        aria-label={props.acceptAria ? props.acceptAria : 'Accept'}
        className='btn btn-primary'
        onClick={
          props.acceptAction
            ? props.acceptAction
            : () => props.closeAction(false)
        }
        type='button'
      >
        {props.acceptLabel ? props.acceptLabel : 'Yes'}
      </button>
      {props.renderDecline && (
        <button
          aria-label={props.declineAria ? props.declineAria : 'Decline'}
          className='btn btn-primary'
          onClick={
            props.declineAction
              ? props.declineAction
              : () => props.closeAction(false)
          }
          type='button'
        >
          {props.declineLabel ? props.declineLabel : 'Yes'}
        </button>
      )}
    </Modal>
  );
}
