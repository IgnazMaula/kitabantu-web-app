import React from "react";

export const Category = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <h1 className="text-3xl font-bold p-16 text-center">Available Categories</h1>
      <div className="grid grid-cols-2 gap-5 row-gap-5 sm:grid-cols-3 lg:grid-cols-6">
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-full bg-gray-100 hover:bg-gray-200 sm:w-20 sm:h-20">
            <img src="/images/house-chores.png" />
          </div>
          <h6 className="mb-2 text-sm font-bold leading-5 tracking-wider uppercase">
            House Chores
          </h6>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-full bg-gray-100 hover:bg-gray-200 sm:w-20 sm:h-20">
            <img src="/images/house-cleaning-organizing.png" alt="House Cleaning & Organizing" />
          </div>
          <h6 className="mb-2 text-sm font-bold leading-5 tracking-wider uppercase">
            House Cleaning & Organizing
          </h6>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-full bg-gray-100 hover:bg-gray-200 sm:w-20 sm:h-20">
            <img src="/images/house-maintenance-repair.png" />
          </div>
          <h6 className="mb-2 text-sm font-bold leading-5 tracking-wider uppercase">
            House Maintenance & Repair
          </h6>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-full bg-gray-100 hover:bg-gray-200 sm:w-20 sm:h-20">
            <img src="/images/home-decoration-furniture.png" />
          </div>
          <h6 className="mb-2 text-sm font-bold leading-5 tracking-wider uppercase">
            Home Décor & Furnitures
          </h6>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-full bg-gray-100 hover:bg-gray-200 sm:w-20 sm:h-20">
            <img src="/images/household-items-appliances.png" alt="Household Items & Appliances" />
          </div>
          <h6 className="mb-2 text-sm font-bold leading-5 tracking-wider uppercase">
            Home Appliances
          </h6>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-full bg-gray-100 hover:bg-gray-200 sm:w-20 sm:h-20">
            <img src="/images/daycare.png" alt="Day Care" />
          </div>
          <h6 className="mb-2 text-sm font-bold leading-5 tracking-wider uppercase">
            Day Care
          </h6>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-full bg-gray-100 hover:bg-gray-200 sm:w-20 sm:h-20">
            <img src="/images/pets-animals.png" alt="Pets & Animals" />
          </div>
          <h6 className="mb-2 text-sm font-bold leading-5 tracking-wider uppercase">
            Pets & Animals
          </h6>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-full bg-gray-100 hover:bg-gray-200 sm:w-20 sm:h-20">
            <img src="/images/vehicle-service-maintenance.png" alt="Vehicle Service & Maintenance" />
          </div>
          <h6 className="mb-2 text-sm font-bold leading-5 tracking-wider uppercase">
            Vehicle Service & Maintenance
          </h6>
        </div>
        {/* <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-full bg-gray-100 hover:bg-gray-200 sm:w-20 sm:h-20">
            <img src="/images/house-party-occasion.png" alt="House Party & Occasion" />
          </div>
          <h6 className="mb-2 text-sm font-bold leading-5 tracking-wider uppercase">
            House Party & Occasion
          </h6>
        </div> */}
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-full bg-gray-100 hover:bg-gray-200 sm:w-20 sm:h-20">
            <img src="/images/transport-shuttle.png" alt="Transport & Shuttle" />
          </div>
          <h6 className="mb-2 text-sm font-bold leading-5 tracking-wider uppercase">
            Cargo & Moving House
          </h6>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-full bg-gray-100 hover:bg-gray-200 sm:w-20 sm:h-20">
            <img src="/images/wellbeing.png" alt="Wellbeing" />
          </div>
          <h6 className="mb-2 text-sm font-bold leading-5 tracking-wider uppercase">
            Wellbeing
          </h6>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-full bg-gray-100 hover:bg-gray-200 sm:w-20 sm:h-20">
            <img src="/images/education-work.png" alt="Education & Work" />
          </div>
          <h6 className="mb-2 text-sm font-bold leading-5 tracking-wider uppercase">
            Student Needs
          </h6>
        </div>
        {/* <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-full bg-gray-100 hover:bg-gray-200 sm:w-20 sm:h-20">
            <img src="/images/skills-hobby.png" alt="Skills & Hobby" />
          </div>
          <h6 className="mb-2 text-sm font-bold leading-5 tracking-wider uppercase">
            Skills & Hobby
          </h6>
        </div> */}
        {/* <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-full bg-gray-100 hover:bg-gray-200 sm:w-20 sm:h-20">
            <img src="/images/fashion-style.png" alt="Fashion & Style" />
          </div>
          <h6 className="mb-2 text-sm font-bold leading-5 tracking-wider uppercase">
            Fashion & Style
          </h6>
        </div> */}
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-full bg-gray-100 hover:bg-gray-200 sm:w-20 sm:h-20">
            <img src="/images/it-support.png" alt="IT Support" />
          </div>
          <h6 className="mb-2 text-sm font-bold leading-5 tracking-wider uppercase">
            IT Support
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Category