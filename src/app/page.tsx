import { MyCustomTitle } from './MyCustomTitle';
import { MyForm } from './MyForm';
import { ViewFileButton } from './ViewFileButton';

export default function Home() {
  return (
    <div className="container mx-auto mt-8">
      <MyCustomTitle />
      <MyForm />
      <ViewFileButton />
    </div>
  );
}
