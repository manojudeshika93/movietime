import { CloseCircle, Heart, Home2, Profile, Star1 } from 'iconsax-react-native';
import React from 'react';

import { HidePwSvg } from '@/assets';
import { tw } from '@/src/config';
import { IconVariantType } from '@/src/constants';

interface IconProps {
  variant?: IconVariantType;
  size?: number;
  color?: string;
}

interface SvgIconProps {
  color?: string;
  width?: number | string;
  height?: number | string;
}

export function CloseIcon({
  variant = IconVariantType.BOLD,
  color = tw.color('neutral-light'),
  size = 16,
}: Readonly<IconProps>) {
  return <CloseCircle variant={variant} size={size} color={color} />;
}

export function HidePwIcon({ width = 24, height = 24, color = tw.color('neutral-dark-400') }: Readonly<SvgIconProps>) {
  return <HidePwSvg width={width} height={height} fill={color} />;
}

export function HomeIcon({
  variant = IconVariantType.BOLD,
  color = tw.color('status-warning'),
  size = 25,
}: Readonly<IconProps>) {
  return <Home2 variant={variant} size={size} color={color} />;
}

export function ProfileIcon({
  variant = IconVariantType.BOLD,
  color = tw.color('status-warning'),
  size = 25,
}: Readonly<IconProps>) {
  return <Profile variant={variant} size={size} color={color} />;
}

export function WishIcon({
  variant = IconVariantType.BOLD,
  color = tw.color('status-warning'),
  size = 25,
}: Readonly<IconProps>) {
  return <Heart variant={variant} size={size} color={color} />;
}
