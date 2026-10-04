import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DemoNotice } from './demo-notice';
describe('DemoNotice',()=>it('discloses the synthetic environment and no fund movement',()=>{render(<DemoNotice/>);expect(screen.getByText('Demo environment · Synthetic data · No funds are moved')).toBeInTheDocument();}));
