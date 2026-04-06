import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ComponentsUI } from './components-ui';
import { ComponentsControls } from './components-controls';
import { ComponentsCatalog } from './components-catalog';

export function ComponentsTab() {
	return (
		<Tabs defaultValue="ui">
			<TabsList className="bg-surface-1">
				<TabsTrigger value="ui">UI</TabsTrigger>
				<TabsTrigger value="controls">Controls</TabsTrigger>
				<TabsTrigger value="catalog">Catalog</TabsTrigger>
			</TabsList>

			<TabsContent value="ui" className="mt-6">
				<ComponentsUI />
			</TabsContent>

			<TabsContent value="controls" className="mt-6">
				<ComponentsControls />
			</TabsContent>

			<TabsContent value="catalog" className="mt-6">
				<ComponentsCatalog />
			</TabsContent>
		</Tabs>
	);
}
