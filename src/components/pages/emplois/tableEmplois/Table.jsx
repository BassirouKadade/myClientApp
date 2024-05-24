import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Table({ data, days, hours }) {
    const {
        handleMouseDown,
        openBac,
        handleMouseMove,
        handleMouseUp,
        selection,
        loadingGetEmplois
    } = data;

    return (
        <div style={{ position: 'relative' }}>
            <table className="schedule-table">
                <thead>
                    <tr>
                        <th
                            style={{ borderRight: '1px solid #ddd', color: '#ffffff', background: '#004c6d' }}
                            className="day-column"
                        >
                            Jour/Heure
                        </th>
                        {hours.map((hour, index) => (
                            <th
                                key={index}
                                className="hour-column"
                                style={{
                                    color: '#ffffff',
                                    background: '#004c6d',
                                    borderRight: index % 2 === 0 ? '1px dashed #dddddd93' : '1px solid #ddd',
                                }}
                            >
                                {hour}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {days.map((day, dayIndex) => (
                        <tr style={{ border: 'none', position: 'relative' }} key={dayIndex} className="day-row">
                            <td style={{ border: 'none' }} className="day-cell">
                                {day}
                            </td>
                            {hours.map((_, index) => (
                                <td
                                    key={index}
                                    onMouseDown={() => handleMouseDown(day, index)}
                                    onMouseMove={() => handleMouseMove(day, index)}
                                    onMouseUp={handleMouseUp}
                                    className={`schedule-cell ${
                                        day === selection.day &&
                                        index >= selection.startIndex &&
                                        index <= selection.endIndex
                                            ? 'selected-cell'
                                            : ''
                                    }`}
                                >
                                    
                                </td>
                            ))}
                        </tr> 
                    ))}
                </tbody>
            </table>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: openBac ? 'flex' : 'none',
                }}
                open={openBac}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
