import ItemForm from "../../Components/ItemsForm";

const AddItems = ({backendUrl ,navigateTo}) => {
  return <ItemForm type={"add"}  backendUrl={backendUrl} navigateTo={navigateTo}/>;
};

export default AddItems;
