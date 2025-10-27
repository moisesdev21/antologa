import React from 'react';

const MyAccount = () => {
  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 dark:bg-dark-bg p-0 transition-colors duration-300">
      <div className="w-[1920px] h-[1870px] bg-white dark:bg-dark-bg transition-colors duration-300">
        {/* Hero/Tour Section */}
        <div className="w-[1920px] h-[1455px] relative overflow-hidden">
          {/* Background Image Container */}
          <div className="w-[1920px] h-96 left-0 top-0 absolute bg-neutral-100 dark:bg-gray-800 overflow-hidden transition-colors duration-300">
            {/* Background Image with Gradient */}
            <div 
               className="w-full h-full absolute bg-contain bg-center bg-no-repeat"
              style={{
                background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(/icons/playa.svg) lightgray 50% / cover no-repeat'
              }}
            />
          </div>
          
          {/* Auto Layout Container */}
           <div className="w-[1200px] h-[1345px] left-[360px] top-[265px] absolute">
            
            {/* Reserve Box - Profile Card */}
            <div className="w-80 p-8 left-0 top-0 absolute bg-stone-50 dark:bg-dark-surface rounded-3xl shadow-[0px_64px_64px_-48px_rgba(15,15,15,0.08)] border border-stone-50 dark:border-gray-700 inline-flex flex-col justify-center items-center gap-8 overflow-hidden transition-colors duration-300">
              {/* Header */}
              <div className="self-stretch flex flex-col justify-start items-center gap-5">
                {/* Avatar */}
                <div className="w-40 h-40 relative">
                  <div className="w-40 h-40 left-0 top-0 absolute bg-red-300 rounded-[100px] overflow-hidden">
                    <img 
                      className="w-40 h-40 left-0 top-0 absolute rounded-full" 
                      src="https://placehold.co/160x160" 
                      alt="Profile"
                    />
                  </div>
                </div>
                
                {/* Info */}
                <div className="flex flex-col justify-center items-center gap-1">
                  {/* Name */}
                  <div className="text-center text-zinc-800 dark:text-white text-3xl font-bold font-['DM_Sans'] leading-10">
                    Sarah Moore
                  </div>
                  
                  {/* Rate and Tier */}
                  <div className="inline-flex justify-center items-center gap-1">
                    {/* Crown Icon */}
                    <div className="w-3 h-3 relative">
                      <img 
                        src="/icons/crown.svg" 
                        alt="Tier"
                        className="w-3 h-3"
                      />
                    </div>
                    <div className="text-slate-500 dark:text-gray-400 text-xs font-normal font-['Poppins'] leading-5">
                      Tier 2 Member
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Divider */}
              <div className="w-48 h-px relative bg-gray-200 dark:bg-gray-600" />
              
              {/* Member Since */}
              <div className="w-48 text-center text-slate-500 dark:text-gray-400 text-xs font-normal font-['Poppins'] leading-5">
                Member since Mar 15, 2017
              </div>
            </div>

            {/* Upcoming Trips Section */}
            <div className="w-[800px] left-[416px] top-[214px] absolute inline-flex flex-col justify-start items-start gap-12">
              <div className="self-stretch flex flex-col justify-start items-start gap-6 overflow-hidden">
                <div className="self-stretch text-zinc-800 dark:text-white text-2xl font-semibold font-['Poppins'] leading-8">
                  Upcoming Trips
                </div>
                
                {/* Product Cards List */}
                <div className="self-stretch inline-flex justify-start items-start gap-8">
                  
                  {/* Product Card 1 */}
                  <div className="w-64 h-96 inline-flex flex-col justify-start items-start">
                    <div className="self-stretch flex-1 relative bg-zinc-800 dark:bg-gray-700 rounded-tl-2xl rounded-tr-2xl overflow-hidden transition-colors duration-300">
                      <div className="w-[911.21px] h-[659.43px] left-[-24px] top-0 absolute bg-white dark:bg-gray-800 overflow-hidden transition-colors duration-300">
                        <img className="w-64 h-96 left-[21px] top-[-16px] absolute" src="https://placehold.co/260x377" alt="Venice, Rome & Milan" />
                      </div>
                    </div>
                    <div className="self-stretch px-2 py-5 bg-gray-50 dark:bg-dark-surface rounded-bl-2xl rounded-br-2xl flex flex-col justify-center items-center gap-4 overflow-hidden transition-colors duration-300">
                      <div className="self-stretch inline-flex justify-between items-center">
                        <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                          <div className="self-stretch text-neutral-900 dark:text-white text-base font-medium font-['Poppins'] leading-6">Venice, Rome & Milan</div>
                          <div className="self-stretch inline-flex justify-between items-start">
                            <div className="flex-1 text-zinc-700 dark:text-gray-300 text-xs font-normal font-['Poppins'] leading-5">Karineside</div>
                            <div className="h-5 rounded flex justify-center items-center gap-1.5">
                              <div className="w-8 h-3 relative">
                                <div className="left-0 top-0 absolute text-center text-gray-400 dark:text-gray-500 text-xs font-bold font-['Poppins'] uppercase leading-3">$699</div>
                                <div className="w-8 h-px left-0 top-[6px] absolute bg-gray-400 dark:bg-gray-500" />
                              </div>
                              <div className="text-center text-green-500 text-xs font-bold font-['Poppins'] uppercase leading-3">$548</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch h-px relative bg-gray-200 dark:bg-gray-600 rounded-[1px]" />
                      <div className="self-stretch inline-flex justify-between items-start">
                        <div className="flex justify-start items-start gap-1">
                          <div className="text-slate-500 dark:text-gray-400 text-xs font-normal font-['Poppins'] leading-5">Tue, Jul 20</div>
                          <div className="text-slate-500 dark:text-gray-400 text-xs font-normal font-['Poppins'] leading-5">-</div>
                          <div className="text-slate-500 dark:text-gray-400 text-xs font-normal font-['Poppins'] leading-5">Fri, Jul 23</div>
                        </div>
                        <div className="flex justify-center items-center gap-1">
                          <div className="w-3 h-3 relative">
                            <img src="/icons/star 1.svg" alt="Rating" className="w-3 h-3" />
                          </div>
                          <div className="text-zinc-800 dark:text-white text-xs font-semibold font-['Poppins'] leading-5">4.9</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Product Card 2 */}
                  <div className="w-64 h-96 inline-flex flex-col justify-start items-start">
                    <div className="self-stretch flex-1 relative bg-zinc-800 dark:bg-gray-700 rounded-tl-2xl rounded-tr-2xl overflow-hidden transition-colors duration-300">
                      <div className="w-[911.21px] h-[659.43px] left-[-24px] top-0 absolute bg-white dark:bg-gray-800 overflow-hidden transition-colors duration-300">
                        <img className="w-64 h-96 left-[21px] top-[-16px] absolute" src="https://placehold.co/260x377" alt="Venice, Rome & Milan" />
                      </div>
                    </div>
                    <div className="self-stretch px-2 py-5 bg-gray-50 dark:bg-dark-surface rounded-bl-2xl rounded-br-2xl flex flex-col justify-center items-center gap-4 overflow-hidden transition-colors duration-300">
                      <div className="self-stretch inline-flex justify-between items-center">
                        <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                          <div className="self-stretch text-neutral-900 dark:text-white text-base font-medium font-['Poppins'] leading-6">Paris & French Riviera</div>
                          <div className="self-stretch inline-flex justify-between items-start">
                            <div className="flex-1 text-zinc-700 dark:text-gray-300 text-xs font-normal font-['Poppins'] leading-5">Frenchside</div>
                            <div className="h-5 rounded flex justify-center items-center gap-1.5">
                              <div className="w-8 h-3 relative">
                                <div className="left-0 top-0 absolute text-center text-gray-400 dark:text-gray-500 text-xs font-bold font-['Poppins'] uppercase leading-3">$799</div>
                                <div className="w-8 h-px left-0 top-[6px] absolute bg-gray-400 dark:bg-gray-500" />
                              </div>
                              <div className="text-center text-green-500 text-xs font-bold font-['Poppins'] uppercase leading-3">$649</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch h-px relative bg-gray-200 dark:bg-gray-600 rounded-[1px]" />
                      <div className="self-stretch inline-flex justify-between items-start">
                        <div className="flex justify-start items-start gap-1">
                          <div className="text-slate-500 dark:text-gray-400 text-xs font-normal font-['Poppins'] leading-5">Mon, Aug 15</div>
                          <div className="text-slate-500 dark:text-gray-400 text-xs font-normal font-['Poppins'] leading-5">-</div>
                          <div className="text-slate-500 dark:text-gray-400 text-xs font-normal font-['Poppins'] leading-5">Sat, Aug 20</div>
                        </div>
                        <div className="flex justify-center items-center gap-1">
                          <div className="w-3 h-3 relative">
                            <img src="/icons/star 1.svg" alt="Rating" className="w-3 h-3" />
                          </div>
                          <div className="text-zinc-800 dark:text-white text-xs font-semibold font-['Poppins'] leading-5">4.7</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Product Card 3 */}
                  <div className="w-64 h-96 inline-flex flex-col justify-start items-start">
                    <div className="self-stretch flex-1 relative bg-zinc-800 dark:bg-gray-700 rounded-tl-2xl rounded-tr-2xl overflow-hidden transition-colors duration-300">
                      <div className="w-[911.21px] h-[659.43px] left-[-24px] top-0 absolute bg-white dark:bg-gray-800 overflow-hidden transition-colors duration-300">
                        <img className="w-64 h-96 left-[21px] top-[-16px] absolute" src="https://placehold.co/260x377" alt="Greek Islands" />
                      </div>
                    </div>
                    <div className="self-stretch px-2 py-5 bg-gray-50 dark:bg-dark-surface rounded-bl-2xl rounded-br-2xl flex flex-col justify-center items-center gap-4 overflow-hidden transition-colors duration-300">
                      <div className="self-stretch inline-flex justify-between items-center">
                        <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                          <div className="self-stretch text-neutral-900 dark:text-white text-base font-medium font-['Poppins'] leading-6">Greek Islands Tour</div>
                          <div className="self-stretch inline-flex justify-between items-start">
                            <div className="flex-1 text-zinc-700 dark:text-gray-300 text-xs font-normal font-['Poppins'] leading-5">Mediterranean</div>
                            <div className="h-5 rounded flex justify-center items-center gap-1.5">
                              <div className="w-8 h-3 relative">
                                <div className="left-0 top-0 absolute text-center text-gray-400 dark:text-gray-500 text-xs font-bold font-['Poppins'] uppercase leading-3">$899</div>
                                <div className="w-8 h-px left-0 top-[6px] absolute bg-gray-400 dark:bg-gray-500" />
                              </div>
                              <div className="text-center text-green-500 text-xs font-bold font-['Poppins'] uppercase leading-3">$749</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch h-px relative bg-gray-200 dark:bg-gray-600 rounded-[1px]" />
                      <div className="self-stretch inline-flex justify-between items-start">
                        <div className="flex justify-start items-start gap-1">
                          <div className="text-slate-500 dark:text-gray-400 text-xs font-normal font-['Poppins'] leading-5">Fri, Sep 2</div>
                          <div className="text-slate-500 dark:text-gray-400 text-xs font-normal font-['Poppins'] leading-5">-</div>
                          <div className="text-slate-500 dark:text-gray-400 text-xs font-normal font-['Poppins'] leading-5">Thu, Sep 8</div>
                        </div>
                        <div className="flex justify-center items-center gap-1">
                          <div className="w-3 h-3 relative">
                            <img src="/icons/star 1.svg" alt="Rating" className="w-3 h-3" />
                          </div>
                          <div className="text-zinc-800 dark:text-white text-xs font-semibold font-['Poppins'] leading-5">4.8</div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="w-[1216px] left-0 top-[635px] absolute inline-flex flex-col justify-start items-start gap-2.5">
              <div className="self-stretch flex flex-col justify-start items-start gap-6">
                <div className="w-[1216px] inline-flex justify-center items-start gap-12 overflow-hidden">
                  <div className="flex-1 inline-flex flex-col justify-start items-start gap-10">
                    <div className="self-stretch flex flex-col justify-center items-center gap-2">
                      <div className="self-stretch text-zinc-800 dark:text-white text-2xl font-semibold font-['Poppins'] leading-8">My reviews</div>
                    </div>
                    <div className="self-stretch flex flex-col justify-center items-center gap-8">
                      <div className="self-stretch inline-flex justify-start items-center">
                        <div className="text-zinc-800 dark:text-white text-xl font-semibold font-['Poppins'] leading-8">3 reviews</div>
                      </div>
                      
                      {/* Review 1 */}
                      <div className="self-stretch flex flex-col justify-center items-center gap-7">
                        <div className="self-stretch inline-flex justify-start items-start gap-5">
                          <div className="w-12 h-12 relative bg-red-300 rounded-[48px] overflow-hidden">
                            <img className="w-12 h-12 left-0 top-0 absolute rounded-full" src="https://placehold.co/48x48" alt="Reviewer" />
                          </div>
                          <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                            <div className="self-stretch flex flex-col justify-start items-start gap-1">
                              <div className="self-stretch inline-flex justify-between items-center">
                                <div className="flex justify-center items-center gap-1">
                                  <div className="text-neutral-900 dark:text-white text-sm font-medium font-['Poppins'] leading-6">Samson</div>
                                  <div className="text-neutral-900 dark:text-white text-sm font-medium font-['Poppins'] leading-6">Heathcote</div>
                                </div>
                                <div className="flex justify-start items-start gap-1">
                                  {[1, 2, 3, 4].map((star) => (
                                    <div key={star} className="w-6 h-6 relative overflow-hidden">
                                      <img src="/icons/star 1.svg" alt="Filled star" className="w-5 h-5 absolute left-[1.53px] top-[2.12px]" />
                                    </div>
                                  ))}
                                  <div className="w-6 h-6 relative overflow-hidden">
                                    <img src="/icons/starcontorno.svg" alt="Empty star" className="w-5 h-5 absolute left-[1.53px] top-[2.12px]" />
                                  </div>
                                </div>
                              </div>
                              <div className="self-stretch text-zinc-700 dark:text-gray-300 text-sm font-normal font-['Poppins'] leading-6">
                                We had the most spectacular view. Unfortunately it was very hot in the room from 2-830 pm due to no air conditioning and no shade.
                              </div>
                            </div>
                            <div className="self-stretch inline-flex justify-start items-center gap-4">
                              <div className="text-slate-500 dark:text-gray-400 text-xs font-normal font-['Poppins'] leading-5">about 1 hour ago</div>
                              <div className="text-zinc-800 dark:text-white text-xs font-semibold font-['Poppins'] leading-5">Like</div>
                              <div className="text-zinc-800 dark:text-white text-xs font-semibold font-['Poppins'] leading-5">Reply</div>
                            </div>
                          </div>
                        </div>
                        <div className="self-stretch h-px relative bg-gray-200 dark:bg-gray-600" />
                      </div>

                      {/* Review 2 */}
                      <div className="self-stretch flex flex-col justify-center items-center gap-7">
                        <div className="self-stretch inline-flex justify-start items-start gap-5">
                          <div className="w-12 h-12 relative bg-violet-300 rounded-[48px] overflow-hidden">
                            <img className="w-12 h-12 left-[-0.75px] top-[-0.75px] absolute rounded-full" src="https://placehold.co/49x49" alt="Reviewer" />
                          </div>
                          <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                            <div className="self-stretch flex flex-col justify-start items-start gap-1">
                              <div className="self-stretch inline-flex justify-between items-center">
                                <div className="flex justify-center items-center gap-1">
                                  <div className="text-neutral-900 dark:text-white text-sm font-medium font-['Poppins'] leading-6">Samson</div>
                                  <div className="text-neutral-900 dark:text-white text-sm font-medium font-['Poppins'] leading-6">Heathcote</div>
                                </div>
                                <div className="flex justify-start items-start gap-1">
                                  {[1, 2, 3, 4].map((star) => (
                                    <div key={star} className="w-6 h-6 relative overflow-hidden">
                                      <img src="/icons/star 1.svg" alt="Filled star" className="w-5 h-5 absolute left-[1.53px] top-[2.12px]" />
                                    </div>
                                  ))}
                                  <div className="w-6 h-6 relative overflow-hidden">
                                    <img src="/icons/starcontorno.svg" alt="Empty star" className="w-5 h-5 absolute left-[1.53px] top-[2.12px]" />
                                  </div>
                                </div>
                              </div>
                              <div className="self-stretch text-zinc-700 dark:text-gray-300 text-sm font-normal font-['Poppins'] leading-6">
                                We had the most spectacular view. Unfortunately it was very hot
                              </div>
                            </div>
                            <div className="self-stretch inline-flex justify-start items-center gap-4">
                              <div className="text-slate-500 dark:text-gray-400 text-xs font-normal font-['Poppins'] leading-5">about 1 hour ago</div>
                              <div className="text-zinc-800 dark:text-white text-xs font-semibold font-['Poppins'] leading-5">Like</div>
                              <div className="text-zinc-800 dark:text-white text-xs font-semibold font-['Poppins'] leading-5">Reply</div>
                            </div>
                          </div>
                        </div>
                        <div className="self-stretch h-px relative bg-gray-200 dark:bg-gray-600" />
                      </div>

                      {/* Review 3 */}
                      <div className="self-stretch flex flex-col justify-center items-center gap-7">
                        <div className="self-stretch inline-flex justify-start items-start gap-5">
                          <div className="w-12 h-12 relative bg-green-200 rounded-[48px] overflow-hidden">
                            <img className="w-12 h-12 left-0 top-0 absolute rounded-full" src="https://placehold.co/48x48" alt="Reviewer" />
                          </div>
                          <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                            <div className="self-stretch flex flex-col justify-start items-start gap-1">
                              <div className="self-stretch inline-flex justify-between items-center">
                                <div className="flex justify-center items-center gap-1">
                                  <div className="text-neutral-900 dark:text-white text-sm font-medium font-['Poppins'] leading-6">Samson</div>
                                  <div className="text-neutral-900 dark:text-white text-sm font-medium font-['Poppins'] leading-6">Heathcote</div>
                                </div>
                                <div className="flex justify-start items-start gap-1">
                                  {[1, 2, 3, 4].map((star) => (
                                    <div key={star} className="w-6 h-6 relative overflow-hidden">
                                      <img src="/icons/star 1.svg" alt="Filled star" className="w-5 h-5 absolute left-[1.53px] top-[2.12px]" />
                                    </div>
                                  ))}
                                  <div className="w-6 h-6 relative overflow-hidden">
                                    <img src="/icons/starcontorno.svg" alt="Empty star" className="w-5 h-5 absolute left-[1.53px] top-[2.12px]" />
                                  </div>
                                </div>
                              </div>
                              <div className="self-stretch text-zinc-700 dark:text-gray-300 text-sm font-normal font-['Poppins'] leading-6">
                                We had the most spectacular view. Unfortunately it was very hot in the room from 2-830 pm due to no air conditioning and no shade.
                              </div>
                            </div>
                            <div className="self-stretch inline-flex justify-start items-center gap-4">
                              <div className="text-slate-500 dark:text-gray-400 text-xs font-normal font-['Poppins'] leading-5">about 1 hour ago</div>
                              <div className="text-zinc-800 dark:text-white text-xs font-semibold font-['Poppins'] leading-5">Like</div>
                              <div className="text-zinc-800 dark:text-white text-xs font-semibold font-['Poppins'] leading-5">Reply</div>
                            </div>
                          </div>
                        </div>
                        <div className="self-stretch h-px relative bg-gray-200 dark:bg-gray-600" />
                      </div>

                      
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;