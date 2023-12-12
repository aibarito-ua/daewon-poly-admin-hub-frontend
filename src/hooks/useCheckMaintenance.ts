import React from 'react';
import useLoginStore from '../store/useLoginStore';
import { useNavigate } from 'react-router-dom';
export const useCheckMaintenance = (error_maintenance:TErrorData) => {
    const {maintenanceData, setMaintenanceData} = useLoginStore();
    const navigate = useNavigate();
    if (error_maintenance) {
        const reject = error_maintenance;
        if (reject.statusCode===555 && reject.data.maintenanceInfo) {
            let dumyMaintenanceData:TMaintenanceData = {
                alertTitle: 'System Maintenance Notice',
                data: reject.data.maintenanceInfo,
                open: false,
                type: ''
            };
            setMaintenanceData(dumyMaintenanceData)
            navigate('/');
        }
    }
}