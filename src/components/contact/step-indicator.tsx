
import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="flex justify-center mt-6">
      <div className="flex items-center space-x-4">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <React.Fragment key={stepNumber}>
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  isCompleted
                    ? 'bg-white text-green-600'
                    : isCurrent
                    ? 'bg-white text-blue-600'
                    : 'bg-blue-400 text-white opacity-50'
                }`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: isCurrent ? 1.1 : 1, 
                  opacity: 1,
                  backgroundColor: isCompleted 
                    ? '#ffffff' 
                    : isCurrent 
                    ? '#ffffff' 
                    : 'rgb(96 165 250 / 0.5)'
                }}
                transition={{ 
                  duration: 0.3, 
                  ease: "easeOut",
                  delay: index * 0.1 
                }}
                whileHover={{ scale: isCurrent ? 1.15 : 1.05 }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 200, 
                        damping: 15,
                        delay: 0.1
                      }}
                    >
                      <Check className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    stepNumber
                  )}
                </motion.div>
              </motion.div>
              {stepNumber < totalSteps && (
                <motion.div
                  className={`w-12 h-0.5 ${
                    isCompleted ? 'bg-white' : 'bg-blue-400 opacity-50'
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={{ 
                    scaleX: 1,
                    backgroundColor: isCompleted ? '#ffffff' : 'rgb(96 165 250 / 0.5)'
                  }}
                  transition={{ 
                    duration: 0.4, 
                    ease: "easeOut",
                    delay: index * 0.1 + 0.3
                  }}
                  style={{ originX: 0 }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
