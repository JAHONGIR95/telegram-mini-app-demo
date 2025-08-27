import React from "react";

interface StarProps {
  value: number; // 0..1 orasida (masalan 0.8 = 80%)
  size?: number; // pxf
  vertical?: boolean;
}

const Star: React.FC<StarProps> = ({ value, vertical = true, size = 16 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_6977_16047"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <path
          d="M9.15189 2.296L10.3252 4.662C10.4852 4.99133 10.9119 5.30733 11.2719 5.36733L13.3979 5.724C14.7579 5.95266 15.0779 6.94733 14.0979 7.92866L12.4446 9.59533C12.1646 9.87733 12.0112 10.422 12.0979 10.812L12.5712 12.8753C12.9446 14.5087 12.0846 15.14 10.6512 14.2867L8.65789 13.0967C8.29789 12.882 7.70455 12.882 7.33788 13.0967L5.34589 14.2867C3.91922 15.14 3.05255 14.5013 3.42589 12.8753L3.89922 10.812C3.98589 10.422 3.83255 9.87733 3.55255 9.59533L1.89922 7.92866C0.926552 6.94666 1.23988 5.95266 2.59922 5.724L4.72589 5.36733C5.07922 5.30733 5.50588 4.99133 5.66588 4.662L6.83922 2.296C7.47922 1.01266 8.51922 1.01266 9.15255 2.296"
          fill="url(#paint0_linear_6977_16047)"
        />
        <path
          d="M9.15188 2.296L10.3252 4.662C10.4852 4.99133 10.9119 5.30733 11.2719 5.36733L13.3979 5.724C14.7579 5.95266 15.0779 6.94733 14.0979 7.92866L12.4446 9.59533C12.1646 9.87733 12.0112 10.422 12.0979 10.812L12.5712 12.8753C12.9446 14.5087 12.0846 15.14 10.6512 14.2867L8.65789 13.0967C8.29789 12.882 7.70455 12.882 7.33789 13.0967L5.34589 14.2867C3.91922 15.14 3.05255 14.5013 3.42589 12.8753L3.89922 10.812C3.98589 10.422 3.83255 9.87733 3.55255 9.59533L1.89922 7.92866C0.926552 6.94666 1.23988 5.95266 2.59922 5.724L4.72589 5.36733C5.07922 5.30733 5.50588 4.99133 5.66588 4.662L6.83922 2.296C7.47922 1.01266 8.51922 1.01266 9.15255 2.296"
          stroke="url(#paint1_linear_6977_16047)"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </mask>
      <g mask="url(#mask0_6977_16047)">
        <rect
          x="-5"
          y="14.6665"
          width={vertical ? value * 12.7 : 16}
          height={vertical ? 19 : value * 26}
          transform="rotate(-90 -5 14.6665)"
          fill="url(#paint2_linear_6977_16047)"
        />
      </g>
      <path
        d="M9.15188 2.296L10.3252 4.662C10.4852 4.99133 10.9119 5.30733 11.2719 5.36733L13.3979 5.724C14.7579 5.95266 15.0779 6.94733 14.0979 7.92866L12.4446 9.59533C12.1646 9.87733 12.0112 10.422 12.0979 10.812L12.5712 12.8753C12.9446 14.5087 12.0846 15.14 10.6512 14.2867L8.65789 13.0967C8.29789 12.882 7.70455 12.882 7.33789 13.0967L5.34589 14.2867C3.91922 15.14 3.05255 14.5013 3.42589 12.8753L3.89922 10.812C3.98589 10.422 3.83255 9.87733 3.55255 9.59533L1.89922 7.92866C0.926552 6.94666 1.23988 5.95266 2.59922 5.724L4.72589 5.36733C5.07922 5.30733 5.50588 4.99133 5.66588 4.662L6.83922 2.296C7.47922 1.01266 8.51922 1.01266 9.15255 2.296"
        stroke="url(#paint3_linear_6977_16047)"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_6977_16047"
          x1="8.00024"
          y1="1.3335"
          x2="8.00024"
          y2="14.6669"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.485" stop-color="#F5AB32" />
          <stop offset="1" stop-color="#D97325" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_6977_16047"
          x1="8.00024"
          y1="1.3335"
          x2="8.00024"
          y2="14.6669"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.485" stop-color="#F5AB32" />
          <stop offset="1" stop-color="#D97325" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_6977_16047"
          x1="9.1665"
          y1="27.1665"
          x2="-4.3335"
          y2="27.1665"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.485" stop-color="#F5AB32" />
          <stop offset="1" stop-color="#D97325" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_6977_16047"
          x1="8.00024"
          y1="1.3335"
          x2="8.00024"
          y2="14.6669"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.412144" stop-color="#F5AB32" />
          <stop offset="1" stop-color="#D97325" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Star;
