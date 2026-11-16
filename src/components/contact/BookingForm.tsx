import React, { useState } from 'react';
import './BookingForm.css';
import TermsModal from './TermsModal';

// The reservation request form is hosted by ajuns.ro. Its widget script is
// loaded once in index.html with data-button="none"; any element carrying
// data-ajuns-open opens the form in an overlay.
const BookingForm: React.FC = () => {
    const [isTermsModalOpen, setTermsModalOpen] = useState(false);

    return (
        <>
            <div className="booking-request">
                <button type="button" className="booking-request__button" data-ajuns-open>
                    Request a reservation
                </button>
                <p className="booking-request__terms">
                    By sending a request you agree to our{' '}
                    <button type="button" className="booking-request__link" onClick={() => setTermsModalOpen(true)}>
                        terms and conditions
                    </button>.
                </p>
            </div>

            <TermsModal isOpen={isTermsModalOpen} onClose={() => setTermsModalOpen(false)} />
        </>
    );
};

export default BookingForm;
