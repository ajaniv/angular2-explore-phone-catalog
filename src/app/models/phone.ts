class AndroidSpecs {
    os: string;
    ui: string;
}

class BatterySpecs {
    standbyTime: string;
    talkTime: string;
    type: string;
}

class CameraSpecs {
    features: string[];
    primary: string;
}

class ConnectivitySpecs {
    bluetooth: string;
    cell: string;
    gps: boolean;
    infrared: boolean;
    wifi: string;
}

class DisplaySpecs {
    screenResolution: string;
    screenSize: string;
    touchScreen: boolean;
}

class HardwareSpecs {
    accelerometer: boolean;
    audioJack: string;
    cpu: string;
    fmRadio: boolean;
    physicalKeyboard: boolean;
    usb: string;
}

class SizeAndWeightSpecs {
    dimensions: string[];
    weight: string;
}

class StorageSpecs {
    flash: string;
    ram: string;
}

export class Phone {
    additionalFeatures?: string;
    age?: string;
    android?: AndroidSpecs;
    availability?: string[];
    battery?: BatterySpecs;
    camera?: CameraSpecs;
    connectivity?: ConnectivitySpecs;
    description?: string;
    display?: DisplaySpecs;
    hardware?: HardwareSpecs;
    id?: string;
    images?: string[];
    name: string;
    sizeAndWeight?: SizeAndWeightSpecs;
    storage?: StorageSpecs;
}
