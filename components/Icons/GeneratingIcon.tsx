import React from 'react';

export const GeneratingIcon: React.FC = () => (
  <div className="spinner">
    <style>
      {`
        .spinner {
          position: relative;
          width: 56px;
          height: 56px;
          animation: spinner-xza56z 2s infinite linear;
        }
        
        .spinner::before,
        .spinner::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          background: #474bff;
          border-radius: 50%;
          animation: spinner-lqsq3g 1.25s infinite ease;
        }
        
        .spinner::before {
          height: 75%;
          width: 75%;
          transform-origin: -40% -80%;
        }
        
        .spinner::after {
          height: 50%;
          width: 50%;
          transform-origin: 40% 80%;
        }
        
        @keyframes spinner-xza56z {
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes spinner-lqsq3g {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
          }
        
          50% {
            transform: translate(-50%, -50%) scale(0);
          }
        }
        `}
    </style>
  </div>
);
