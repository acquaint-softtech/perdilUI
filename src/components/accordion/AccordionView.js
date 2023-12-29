import React from 'react';
import Accordion from './Accordion';
import AccordionItem from './AccordionItem';

const AccordionView = () => {
  return (
    <Accordion>
      <AccordionItem
        heading={'What is Pines?'}
        content={'Pines is a UI library built for AlpineJS and TailwindCSS.'}
      />
      <AccordionItem
        heading={'How do I install Pines?'}
        content={
          'Add AlpineJS and TailwindCSS to your page and then copy and paste any of these elements into your project.'
        }
      />
      <AccordionItem
        heading={'Can I use Pines with other libraries or frameworks?'}
        content={
          'Absolutely! Pines works with any other library or framework. Pines works especially well with the TALL stack.'
        }
      />
    </Accordion>
  );
};

export default AccordionView;
