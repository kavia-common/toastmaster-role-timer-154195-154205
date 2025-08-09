import React, { PropsWithChildren } from 'react'

const Modal: React.FC<{onClose: ()=>void} & PropsWithChildren> = ({ onClose, children }) => (
  <div className="modal-bg" onClick={onClose}>
    <div className="modal-content" onClick={e=>e.stopPropagation()}>
      {children}
    </div>
  </div>
)
export default Modal
