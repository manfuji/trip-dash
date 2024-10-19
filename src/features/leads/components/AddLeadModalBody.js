/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText, { Selectable } from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addNewLead } from "../leadSlice";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline"; // Import the close icon
import React from "react";

const INITIAL_LEAD_OBJ = {
  title: "",
  description: "",
  categories: [{ name: "", categories: [] }],
  titleBanner: null,
  otherImages: [],
};

function AddLeadModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [categoryItems, setCategoryItems] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [trip, setTrip] = useState(INITIAL_LEAD_OBJ);
  const [titleBannerPreview, setTitleBannerPreview] = useState(null);
  const [otherImagesPreview, setOtherImagesPreview] = useState([]);

  const saveNewLead = () => {
    if (trip.title.trim() === "") return setErrorMessage("Title is required!");
    else if (trip.description.trim() === "")
      return setErrorMessage("Description is required!");
    else {
      let newtrip = {
        id: 7,
        title: trip.title,
        description: trip.description,
        avatar: trip.titleBanner ? URL.createObjectURL(trip.titleBanner) : "",
        otherImages: trip.otherImages.map((image) =>
          URL.createObjectURL(image)
        ),
      };
      dispatch(addNewLead({ newtrip }));
      dispatch(showNotification({ message: "New Lead Added!", status: 1 }));
      closeModal();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setTrip({ ...trip, [updateType]: value });
  };

  const handleTitleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTrip({ ...trip, titleBanner: file });
      setTitleBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveTitleBanner = () => {
    setTrip({ ...trip, titleBanner: null });
    setTitleBannerPreview(null);
  };

  const handleOtherImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setTrip((prev) => ({ ...prev, otherImages: files }));
      setOtherImagesPreview(files.map((file) => URL.createObjectURL(file)));
    }
  };

  const handleRemoveOtherImage = (index) => {
    const updatedImages = trip.otherImages.filter((_, i) => i !== index);
    const updatedPreviews = otherImagesPreview.filter((_, i) => i !== index);
    setTrip((prev) => ({ ...prev, otherImages: updatedImages }));
    setOtherImagesPreview(updatedPreviews);
  };

  const updateCategories = (e) => {
    e.preventDefault();
    const categories = {
      name: categoryName,
      categories: categoryItems.map((category) => category.value),
    };
    setCategoryName("");
    setCategoryItems([]);
    setTrip((prev) => {
      return {
        ...prev,
        categories: [...prev.categories, categories],
      };
    });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={trip.title}
        updateType="title"
        containerStyle="mt-4"
        labelTitle="Trip Title"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={trip.description}
        updateType="description"
        containerStyle="mt-4"
        labelTitle="Trip Description"
        updateFormValue={updateFormValue}
      />

      {/* Single Image Picker for Title Banner */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Title Banner
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleTitleBannerChange}
          className="block w-full text-sm text-gray-500 mt-2"
        />
        {titleBannerPreview && (
          <div className="mt-4 relative">
            <img
              src={titleBannerPreview}
              alt="Title Banner"
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              onClick={handleRemoveTitleBanner}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Multiple Image Picker for Other Images */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Other Images
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleOtherImagesChange}
          className="block w-full text-sm text-gray-500 mt-2"
        />
        <div className="grid grid-cols-3 gap-4 mt-4">
          {otherImagesPreview.map((src, index) => (
            <div key={index} className="relative">
              <img
                src={src}
                alt={`Other Image ${index + 1}`}
                className="object-cover w-full h-32 rounded-lg"
              />
              <button
                onClick={() => handleRemoveOtherImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
              >
                <XMarkIcon className="h-5 w-5" color="white" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div>
        <InputText
          type="text"
          defaultValue={categoryName}
          updateType="categoryName"
          containerStyle="mt-4"
          labelTitle="Category Name"
          updateFormValue={(item) => setCategoryName(item.value)}
        />
        <Selectable setValue={setCategoryItems} value={categoryItems} />
        <button
          type="submit"
          className="btn btn-primary px-1 mt-5 w-28"
          onClick={(e) => updateCategories(e)}
        >
          <PlusIcon className="h-5 w-5 " />
        </button>
      </div>

      {/* Displaying Added Categories */}
      {trip.categories?.map((category, idx) => (
        <div key={idx} className="ml-5 mt-2">
          <h1 className="text-lg font-semibold underline">{category.name}</h1>
          <ul className="list-inside flex flex-row">
            {category.categories?.map((categoryItem, index) => (
              <li key={index} className="mr-4 bg-gray-200 rounded-xl px-3">
                {categoryItem}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button className="btn btn-primary px-6" onClick={() => saveNewLead()}>
          Save
        </button>
      </div>
    </>
  );
}

export default AddLeadModalBody;
