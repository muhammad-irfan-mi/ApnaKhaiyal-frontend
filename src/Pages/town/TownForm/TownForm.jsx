import React, { useContext, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, X, Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { FileUploader } from './FileUploader';
import axios from 'axios';
import { Context } from '../../../Context/ContextProvider';

const TownForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentMarlaInput, setCurrentMarlaInput] = useState('');
  const [currentQuantityInput, setCurrentQuantityInput] = useState('');
  const [currentPlotNumbersInput, setCurrentPlotNumbersInput] = useState('');
  const navigate = useNavigate();
  const { userInfo } = useContext(Context)
  const id = userInfo._id

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const steps = [
    { title: 'Basic Information', description: 'Enter town details' },
    { title: 'Phases', description: 'Add phases and their information' },
    { title: 'Documents', description: 'Upload required documents' },
    { title: 'Review', description: 'Review and submit' }
  ];

  const { control, handleSubmit, register, watch, formState: { errors, isValid }, setValue, getValues } = useForm({
    defaultValues: {
      name: '',
      area: '',
      address: '',
      city: '',
      userId: '664c9aa9e3e746cc2d5077c4',
      locationMap: null,
      nocRegistry: null,
      documents: [], // This should be an array of files
      phases: [{
        name: '',
        shops: 0,
        plots: [], // Array of plot objects
        images: [], // Array of image files
        video: null // Single video file
      }]
    },
    mode: 'onChange'
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'phases'
  });

  const watchedFields = watch();

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  // const handleAddPlotGroup = (phaseIndex) => {
  //   if (!currentMarlaInput || !currentQuantityInput || !currentPlotNumbersInput) return;

  //   const plotNumbers = currentPlotNumbersInput.split(',')
  //     .map(num => num.trim())
  //     .filter(num => num);

  //   const newPlotGroup = {
  //     marla: parseFloat(currentMarlaInput),
  //     quantity: parseInt(currentQuantityInput),
  //     plotNumbers: plotNumbers
  //   };

  //   const currentPlots = watchedFields.phases[phaseIndex].plots || [];
  //   setValue(`phases.${phaseIndex}.plots`, [...currentPlots, newPlotGroup]);

  //   // Clear inputs
  //   setCurrentMarlaInput('');
  //   setCurrentQuantityInput('');
  //   setCurrentPlotNumbersInput('');
  // };

  const handleAddPlotGroup = (phaseIndex) => {
    if (!currentMarlaInput || !currentQuantityInput || !currentPlotNumbersInput) return;

    const plotNumbersArray = currentPlotNumbersInput
      .split(',')
      .map(num => num.trim())
      .filter(num => num)
      .map(num => ({
        number: num,
        status: "pending",
        dealerName: "",
        dealerContact: ""
      }));

    const newPlotGroup = {
      marla: parseFloat(currentMarlaInput),
      quantity: parseInt(currentQuantityInput),
      plotNumbers: plotNumbersArray
    };

    const currentPlots = watchedFields.phases[phaseIndex].plots || [];
    setValue(`phases.${phaseIndex}.plots`, [...currentPlots, newPlotGroup]);

    // Clear inputs
    setCurrentMarlaInput('');
    setCurrentQuantityInput('');
    setCurrentPlotNumbersInput('');
  };


  const handleRemovePlotGroup = (phaseIndex, plotGroupIndex) => {
    const updatedPlots = [...watchedFields.phases[phaseIndex].plots];
    updatedPlots.splice(plotGroupIndex, 1);
    setValue(`phases.${phaseIndex}.plots`, updatedPlots);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Append basic information
      formData.append('name', data.name);
      formData.append('area', data.area);
      formData.append('address', data.address);
      formData.append('city', data.city);
      formData.append('userId', data.userId);

      // Append files
      if (data.locationMap) {
        formData.append('locationMap', data.locationMap);
      }
      if (data.nocRegistry) {
        formData.append('nocRegistry', data.nocRegistry);
      }

      // Append documents
      if (data.documents?.length > 0) {
        data.documents.forEach((doc) => {
          formData.append('documents', doc);
        });
      }

      // Append phases
      const cleanedPhases = data.phases.map((phase) => {
        return {
          name: phase.name,
          shops: phase.shops,
          plots: (phase.plots || []).map(plot => ({
            marla: plot.marla,
            quantity: plot.quantity,
            plotNumbers: plot.plotNumbers
          }))
        };
      });

      formData.append('phases', JSON.stringify(cleanedPhases));

      // Append phase images and videos separately
      data.phases.forEach((phase, phaseIndex) => {
        if (phase.images?.length > 0) {
          phase.images.forEach((img) => {
            formData.append(`phaseImages${phaseIndex}`, img);
          });
        }

        if (phase.video) {
          formData.append(`phaseVideo${phaseIndex}`, phase.video);
        }
      });

      const response = await axios.post(`${BASE_URL}/api/town/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Town added successfully:', response);
      // navigate('/');
      console.log('formData', formData);
    } catch (error) {
      console.error('Error submitting town:', error);
    } finally {
      setIsSubmitting(false);
    }
  };


  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-blue-900">Basic Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Town Name*
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name', { required: 'Town name is required' })}
                  className={`w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} 
                  py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                  Area*
                </label>
                <input
                  id="area"
                  type="text"
                  {...register('area', { required: 'Area is required' })}
                  placeholder="e.g., 20"
                  className={`w-full rounded-md border ${errors.area ? 'border-red-500' : 'border-gray-300'} 
                  py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.area && (
                  <p className="mt-1 text-sm text-red-600">{errors.area.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address*
              </label>
              <input
                id="address"
                type="text"
                {...register('address', { required: 'Address is required' })}
                className={`w-full rounded-md border ${errors.address ? 'border-red-500' : 'border-gray-300'} 
                py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City*
              </label>
              <input
                id="city"
                type="text"
                {...register('city', { required: 'City is required' })}
                className={`w-full rounded-md border ${errors.city ? 'border-red-500' : 'border-gray-300'} 
                py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
              )}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-blue-900">Town Phases</h2>
              <button
                type="button"
                onClick={() => append({
                  name: '',
                  shops: 0,
                  plots: []
                })}
                className="flex items-center text-sm bg-blue-100 text-blue-800 py-2 px-4 rounded-md 
                hover:bg-blue-200 transition-colors"
              >
                <Plus size={16} className="mr-1" /> Add Phase
              </button>
            </div>

            {fields.length === 0 && (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-500">No phases added yet. Click "Add Phase" to begin.</p>
              </div>
            )}

            {fields.map((field, phaseIndex) => (
              <div key={field.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Phase {phaseIndex + 1}</h3>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(phaseIndex)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phase Name*
                    </label>
                    <input
                      {...register(`phases.${phaseIndex}.name`, { required: 'Phase name is required' })}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 
                      focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.phases?.[phaseIndex]?.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.phases[phaseIndex]?.name?.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Shops*
                    </label>
                    <input
                      type="number"
                      {...register(`phases.${phaseIndex}.shops`, {
                        required: 'Number of shops is required',
                        min: { value: 0, message: 'Cannot be negative' }
                      })}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 
                      focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.phases?.[phaseIndex]?.shops && (
                      <p className="mt-1 text-sm text-red-600">{errors.phases[phaseIndex]?.shops?.message}</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Add Plot Group
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        <div>
                          <input
                            type="number"
                            value={currentMarlaInput}
                            onChange={(e) => setCurrentMarlaInput(e.target.value)}
                            placeholder="Marla (e.g., 5)"
                            className="w-full rounded-md border border-gray-300 py-2 px-3 
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                            step="0.5"
                          />
                        </div>
                        <div>
                          <input
                            type="number"
                            value={currentQuantityInput}
                            onChange={(e) => setCurrentQuantityInput(e.target.value)}
                            placeholder="Quantity"
                            className="w-full rounded-md border border-gray-300 py-2 px-3 
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <input
                            type="text"
                            value={currentPlotNumbersInput}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\s+/g, ',');
                              setCurrentPlotNumbersInput(val);
                            }}
                            placeholder="Plot numbers (space or comma separated)"
                            className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAddPlotGroup(phaseIndex)}
                        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      >
                        Add Plot Group
                      </button>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-md">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Plot Groups</h4>
                      {watchedFields.phases[phaseIndex]?.plots?.length > 0 ? (
                        <div className="space-y-3">
                          {watchedFields.phases[phaseIndex].plots.map((plotGroup, plotGroupIndex) => (
                            <div key={plotGroupIndex} className="bg-white p-3 rounded border border-gray-200">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium">{plotGroup.marla} Marla</p>
                                  <p className="text-sm">Quantity: {plotGroup.quantity}</p>
                                  {/* <p className="text-sm">Plot Numbers: {plotGroup.plotNumbers.join(', ')}</p> */}
                                  <p className="text-sm">
                                    Plot Numbers: {plotGroup.plotNumbers.map(p => p.number).join(', ')}
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemovePlotGroup(phaseIndex, plotGroupIndex)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">No plot groups added yet</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phase Images*
                    </label>
                    <Controller
                      control={control}
                      name={`phases.${phaseIndex}.images`} // Changed from phaseImages${phaseIndex}
                      rules={{ required: 'At least one image is required' }}
                      render={({ field }) => (
                        <FileUploader
                          onFilesSelected={(files) => field.onChange(files)}
                          acceptedFileTypes={{
                            'image/*': ['.jpg', '.jpeg', '.png', '.gif']
                          }}
                          multiple={true}
                          value={field.value}
                          placeholder="Drag & drop phase images or click to browse"
                        />
                      )}
                    />
                    {errors[`phaseImages${phaseIndex}`] && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors[`phaseImages${phaseIndex}`]?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phase Video (optional)
                    </label>
                    <Controller
                      control={control}
                      name={`phases.${phaseIndex}.video`} // Changed from phaseVideo${phaseIndex}
                      render={({ field }) => (
                        <FileUploader
                          onFilesSelected={(files) => field.onChange(files[0] || null)}
                          acceptedFileTypes={{
                            'video/*': ['.mp4', '.mov', '.avi', '.wmv']
                          }}
                          value={field.value ? [field.value] : []}
                          placeholder="Drag & drop a video or click to browse"
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phase Video (optional)
                    </label>
                    <Controller
                      control={control}
                      name={`phaseVideo${phaseIndex}`}
                      render={({ field }) => (
                        <FileUploader
                          onFilesSelected={(files) => field.onChange(files[0] || null)}
                          acceptedFileTypes={{
                            'video/*': ['.mp4', '.mov', '.avi', '.wmv']
                          }}
                          value={field.value ? [field.value] : []}
                          placeholder="Drag & drop a video or click to browse"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-blue-900">Documents</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location Map*
                </label>
                <Controller
                  control={control}
                  name="locationMap"
                  rules={{ required: 'Location map is required' }}
                  render={({ field }) => (
                    <FileUploader
                      onFilesSelected={(files) => field.onChange(files[0] || null)}
                      acceptedFileTypes={{
                        'image/*': ['.jpg', '.jpeg', '.png', '.gif']
                      }}
                      value={field.value ? [field.value] : []}
                      placeholder="Drag & drop map image or click to browse"
                    />
                  )}
                />
                {errors.locationMap && (
                  <p className="mt-1 text-sm text-red-600">{errors.locationMap.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NOC Registry Document*
                </label>
                <Controller
                  control={control}
                  name="nocRegistry"
                  rules={{ required: 'NOC registry document is required' }}
                  render={({ field }) => (
                    <FileUploader
                      onFilesSelected={(files) => field.onChange(files[0] || null)}
                      acceptedFileTypes={{
                        'application/pdf': ['.pdf'],
                        'application/msword': ['.doc'],
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
                      }}
                      value={field.value ? [field.value] : []}
                      placeholder="Drag & drop NOC document or click to browse"
                    />
                  )}
                />
                {errors.nocRegistry && (
                  <p className="mt-1 text-sm text-red-600">{errors.nocRegistry.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Documents (optional)
                </label>
                <Controller
                  control={control}
                  name="documents"
                  render={({ field }) => (
                    <FileUploader
                      onFilesSelected={(files) => field.onChange(files)}
                      acceptedFileTypes={{
                        'application/pdf': ['.pdf'],
                        'application/msword': ['.doc'],
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                        'image/*': ['.jpg', '.jpeg', '.png']
                      }}
                      multiple={true}
                      value={field.value}
                      placeholder="Drag & drop additional documents or click to browse"
                    />
                  )}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-blue-900">Review & Submit</h2>

            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
              <h3 className="text-lg font-semibold text-blue-800">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem label="Town Name" value={watchedFields.name} />
                <InfoItem label="Area" value={watchedFields.area} />
                <InfoItem label="Address" value={watchedFields.address} />
                <InfoItem label="City" value={watchedFields.city} />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-blue-800">Phases ({watchedFields.phases.length})</h3>
              {watchedFields.phases.map((phase, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-md">
                  <h4 className="font-medium mb-2">Phase {index + 1}: {phase.name}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <InfoItem
                      label="Shops"
                      value={phase.shops || 0}
                    />
                    <InfoItem
                      label="Plot Groups"
                      value={phase.plots?.length || 0}
                    />
                    <InfoItem
                      label="Images"
                      value={`${phase.images?.length || 0} ${phase.images?.length === 1 ? 'file' : 'files'} selected`}
                    />
                    <InfoItem
                      label="Video"
                      value={phase.video ? '1 file selected' : 'None'}
                    />
                  </div>
                  {phase.plots?.length > 0 && (
                    <div className="mt-3">
                      <h5 className="text-sm font-medium text-gray-700 mb-1">Plot Groups:</h5>
                      <div className="space-y-2">
                        {phase.plots.map((plotGroup, groupIndex) => (
                          <div key={groupIndex} className="bg-white p-3 rounded border border-gray-200">
                            <p className="font-medium">{plotGroup.marla} Marla</p>
                            <p className="text-sm">Quantity: {plotGroup.quantity}</p>
                            {/*<p className="text-sm">Plot Numbers: {plotGroup.plotNumbers.join(', ')}</p>*/}
                            <p className="text-sm">
                              Plot Numbers: {plotGroup.plotNumbers.map(p => p.number).join(', ')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-blue-800">Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem
                  label="Location Map"
                  value={watchedFields.locationMap ? watchedFields.locationMap.name : 'None'}
                />
                <InfoItem
                  label="NOC Registry"
                  value={watchedFields.nocRegistry ? watchedFields.nocRegistry.name : 'None'}
                />
                <div className="md:col-span-2">
                  <InfoItem
                    label="Additional Documents"
                    value={`${watchedFields.documents?.length || 0} ${watchedFields.documents?.length === 1 ? 'file' : 'files'} selected`}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-blue-900 px-6 py-4">
        <h1 className="text-xl font-bold text-white">Add New Town</h1>
      </div>

      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center 
                    ${index <= currentStep ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-500'}`}
                  >
                    {index < currentStep ? (
                      <Check size={18} />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <div className="text-xs text-center mt-2 max-w-[80px]">
                    <p className="font-medium">{step.title}</p>
                    <p className="text-gray-500">{step.description}</p>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${index < currentStep ? 'bg-blue-800' : 'bg-gray-200'
                      }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {renderStepContent()}

          <div className="mt-8 flex justify-between">
            {currentStep > 0 ? (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft size={16} className="mr-1" /> Previous
              </button>
            ) : (
              <div />
            )}

            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition-colors"
              >
                Next <ArrowRight size={16} className="ml-1" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center px-6 py-2 rounded-md transition-colors ${isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-800 hover:bg-blue-900 text-white'
                  }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Town'}
                {!isSubmitting && <Check size={16} className="ml-1" />}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-xs text-gray-500">{label}</span>
    <span className="font-medium">{value || 'Not provided'}</span>
  </div>
);

export default TownForm;