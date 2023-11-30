import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const AllocationForm = (props) => {
    const { dispatch, remaining } = useContext(AppContext);

    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [action, setAction] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('£'); // Default currency Pound

    const currencies = ['$ Dollars', '£ Euros', '€ Pounds', '₹ Rupees']; // Available currencies

    const isFormValid = cost > 0 && cost <= remaining;

    const submitEvent = () => {
        if (!isFormValid) {
            alert(`Please enter a valid cost between 1 and £${remaining}`);
            return;
        }

        const expense = {
            name: name,
            cost: parseInt(cost),
            currency: selectedCurrency, // Include the selected currency in the expense object
        };

        if (action === 'Reduce') {
            dispatch({
                type: 'RED_EXPENSE',
                payload: expense,
            });
        } else {
            dispatch({
                type: 'ADD_EXPENSE',
                payload: expense,
            });
        }

        // Clear form fields after submission
        setName('');
        setCost('');
        setAction('');
        setSelectedCurrency('£'); // Reset currency to default after submission
    };

    return (
        <div>
            <div className='row'>
                <div className="input-group mb-3" style={{ marginLeft: '2rem' }}>
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">
                            Department
                        </label>
                    </div>
                    <select
                        className="custom-select"
                        id="inputGroupSelect01"
                        onChange={(event) => setName(event.target.value)}
                        value={name}
                    >
                        <option defaultValue>Choose...</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="Finance">Finance</option>
                        <option value="HR">HR</option>
                        <option value="IT">IT</option>
                        <option value="Admin">Admin</option>
                    </select>

                    <div className="input-group-prepend" style={{ marginLeft: '2rem' }}>
                        <label className="input-group-text" htmlFor="inputGroupSelect02">
                            Allocation
                        </label>
                    </div>
                    <select
                        className="custom-select"
                        id="inputGroupSelect02"
                        onChange={(event) => setAction(event.target.value)}
                        value={action}
                    >
                        <option value="Add">Add</option>
                        <option value="Reduce">Reduce</option>
                    </select>

                    <div className="input-group-prepend" style={{ marginLeft: '2rem' }}>
                        <span className="input-group-text" id="changeAllocationText">
                            {selectedCurrency}
                        </span>
                    </div>
                    <div>
                    <input
                        required='required'
                        type='number'
                        id='cost'
                        value={cost}
                        style={{ marginLeft: '2rem' }}
                        onChange={(event) => setCost(event.target.value)}
                    />
                    </div>

                    {/* New currency dropdown */}
                    <div className="input-group-prepend" style={{ marginLeft: '2rem' }}>
                        <label className="input-group-text" htmlFor="inputGroupSelectCurrency">
                            Currency
                        </label>
                    </div>
                    <select
                        className="custom-select"
                        id="inputGroupSelectCurrency"
                        onChange={(event) => setSelectedCurrency(event.target.value)}
                        value={selectedCurrency}
                    >
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>

                    <button
                        className="btn btn-primary"
                        onClick={submitEvent}
                        style={{ marginLeft: '2rem' }}
                        disabled={!isFormValid}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllocationForm;
