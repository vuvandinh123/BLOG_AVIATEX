import { useState, useEffect } from 'react';
const getDeviceType = () => {
    const width = window.innerWidth;
    if (width < 768) {
        return 'mobile';
    } else if (width >= 768 && width < 1024) {
        return 'tablet';
    } else {
        return 'desktop';
    }
};
const useDeviceType = () => {
    const [deviceType, setDeviceType] = useState(getDeviceType());

    useEffect(() => {
        const handleResize = () => {
            setDeviceType(getDeviceType());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    return deviceType;
};

export default useDeviceType;
