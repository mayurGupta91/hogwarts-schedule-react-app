// AttendanceGrid.js

import React from 'react';
import PropTypes from 'prop-types';

const AttendanceGrid = ({ teacherAttendance, onAttendanceChange }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Teacher</th>
                    <th>Attendance</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(teacherAttendance).map(teacher => (
                    <tr key={teacher}>
                        <td>{teacher}</td>
                        <td>
                            <select
                                value={teacherAttendance[teacher]}
                                onChange={e => onAttendanceChange(teacher, e.target.value)}
                            >
                                <option value="Present">Present</option>
                                <option value="Absent">Absent</option>
                            </select>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

AttendanceGrid.propTypes = {
    teacherAttendance: PropTypes.object,
    onAttendanceChange: PropTypes.func.isRequired,
};

export default AttendanceGrid;
