import { MyCustomTitle } from './MyCustomTitle';
import { MyForm } from './MyForm';

export default function Home() {
  return (
    <div className="container mx-auto mt-8">
      <MyCustomTitle />
      <MyForm />
    </div>
  );
}
