export const APP_NAME = 'Tunnelbear' as const;

export const CREDENTIALS = {
  CREDENTIALS: 'credentials',
  USERNAME: 'username',
  PASSWORD: 'password',
  CONFIRMATION: 'confirmation',
} as const;

export enum Platform {
  WINDOWS = 'win32',
  MAC = 'darwin',
  LINUX = 'linux',
  SUN = 'sunos',
  OPENBSD = 'openbsd',
  ANDROID = 'android',
  AIX = 'aix',
}

export const COMMANDS = {
  GET_OVPN_PIDS: 'pgrep openvpn',
  get KILL_OPVPN_PIDS() {
    return `${this.GET_OVPN_PIDS} | xargs sudo kill -9`;
  },
  START_VPN: 'openvpn --config config.ovpn',
};

export const LAT_LNG: Tunnelbear.CountryLatLng[] = [
  {
    country: 'Argentina',
    position: [-38.41609, -63.616672],
  },
  {
    country: 'Austria',
    position: [47.516231, 14.550072],
  },
  {
    country: 'Australia',
    position: [-25.274398, 133.775136],
  },
  {
    country: 'Belgium',
    position: [50.503887, 4.469936],
  },
  {
    country: 'Brazil',
    position: [-14.235004, -51.92528],
  },
  {
    country: 'Bulgaria',
    position: [42.733883, 25.48583],
  },
  {
    country: 'Canada',
    position: [56.130366, -106.346771],
  },
  {
    country: 'Chile',
    position: [-35.675147, -71.542969],
  },
  {
    country: 'Colombia',
    position: [4.570868, -74.297333],
  },
  {
    country: 'Cyprus',
    position: [35.126413, 33.429859],
  },
  {
    country: 'Czech Republic',
    position: [49.817492, 15.472962],
  },
  {
    country: 'Denmark',
    position: [56.26392, 9.501785],
  },
  {
    country: 'Finland',
    position: [61.92411, 25.748151],
  },
  {
    country: 'France',
    position: [46.227638, 2.213749],
  },
  {
    country: 'Germany',
    position: [51.165691, 10.451526],
  },
  {
    country: 'Greece',
    position: [39.074208, 21.824312],
  },
  {
    country: 'Hungary',
    position: [47.162494, 19.503304],
  },
  {
    country: 'India',
    position: [20.593684, 78.96288],
  },
  {
    country: 'Indonesia',
    position: [-0.789275, 113.921327],
  },
  {
    country: 'Ireland',
    position: [53.41291, -8.24389],
  },
  {
    country: 'Italy',
    position: [41.87194, 12.56738],
  },
  {
    country: 'Japan',
    position: [36.204824, 138.252924],
  },
  {
    country: 'Kenya',
    position: [-0.023559, 37.906193],
  },
  {
    country: 'Latvia',
    position: [56.879635, 24.603189],
  },
  {
    country: 'Lithuania',
    position: [55.169438, 23.881275],
  },
  {
    country: 'Malaysia',
    position: [4.210484, 101.975766],
  },
  {
    country: 'Mexico',
    position: [23.634501, -102.552784],
  },
  {
    country: 'Moldova',
    position: [47.411631, 28.369885],
  },
  {
    country: 'Netherlands',
    position: [52.132633, 5.291266],
  },
  {
    country: 'New Zealand',
    position: [-40.900557, 174.885971],
  },
  {
    country: 'Nigeria',
    position: [9.081999, 8.675277],
  },
  {
    country: 'Norway',
    position: [60.472024, 8.468946],
  },
  {
    country: 'Peru',
    position: [-9.189967, -75.015152],
  },
  {
    country: 'Poland',
    position: [51.919438, 19.145136],
  },
  {
    country: 'Portugal',
    position: [39.399872, -8.224454],
  },
  {
    country: 'Romania',
    position: [45.943161, 24.96676],
  },
  {
    country: 'Serbia',
    position: [44.016521, 21.005859],
  },
  {
    country: 'Singapore',
    position: [1.352083, 103.819836],
  },
  {
    country: 'Slovenia',
    position: [46.151241, 14.995463],
  },
  {
    country: 'South Africa',
    position: [-30.559482, 22.937506],
  },
  {
    country: 'South Korea',
    position: [35.907757, 127.766922],
  },
  {
    country: 'Spain',
    position: [40.463667, -3.74922],
  },
  {
    country: 'Sweden',
    position: [60.128161, 18.643501],
  },
  {
    country: 'Switzerland',
    position: [46.818188, 8.227512],
  },
  {
    country: 'Taiwan',
    position: [23.69781, 120.960515],
  },
  {
    country: 'Ukraine',
    position: [48.379433, 31.16558],
  },
  {
    country: 'United Kingdom',
    position: [55.378051, -3.435973],
  },
  {
    country: 'United States',
    position: [37.09024, -95.712891],
  },
];
