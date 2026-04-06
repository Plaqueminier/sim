import { Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';

interface SimulationPageProps {
	title: string;
	description: string;
	accent?: string;
	playback?: ReactNode;
	controls: ReactNode;
	stats?: ReactNode;
	canvas: ReactNode;
}

export function SimulationPage({
	title,
	description,
	accent,
	playback,
	controls,
	stats,
	canvas,
}: SimulationPageProps) {
	return (
		<div
			className="min-h-screen bg-background text-foreground"
			style={
				accent ? ({ '--sim-accent': accent } as React.CSSProperties) : undefined
			}
		>
			<div className="mx-auto max-w-7xl p-6 pb-0">
				<div className="mb-6">
					<Link
						to="/"
						className="text-muted-foreground hover:text-foreground text-sm transition-colors"
					>
						← Back to home
					</Link>
				</div>

				<h1 className="text-3xl font-bold mb-2">{title}</h1>
				<p className="text-muted-foreground mb-6">{description}</p>

				{playback && <div className="mb-4">{playback}</div>}
				{controls}
				{stats && <div className="my-4">{stats}</div>}
			</div>

			{canvas}
		</div>
	);
}
