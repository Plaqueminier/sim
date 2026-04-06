import { createFileRoute } from '@tanstack/react-router';
import { ElementaryCA } from '@/simulations/elementary-ca';

export const Route = createFileRoute('/elementary-ca/')({
	component: ElementaryCA,
});
