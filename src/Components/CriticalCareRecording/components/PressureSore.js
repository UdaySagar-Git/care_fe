import { useState } from "react";

// TODO: Add Name, Value to each body part and implement multiselect
const parts = [
  {
    path: (addlProps) => (
      <path
        d="M554.65,204.063c30.218.4,30.621-29.815,30.621-29.815,9.267-.2,13.3-18.534,12.49-22.16s-7.051-1.41-7.051-1.41c3.425-28.2-9.065-45.327-16.721-50.363s-19.339-5.843-19.339-5.843h.4s-11.684.806-19.339,5.843-20.146,22.16-16.721,50.363c0,0-6.245-2.216-7.051,1.41s3.223,21.959,12.49,22.16c0,0,.4,30.218,30.621,29.815Z"
        transform="translate(-390.349 -94.472)"
        {...addlProps}
      />
    ),
  },
  {
    path: (addlProps) => (
      <path
        d="M532.993,209.3"
        transform="translate(-390.349 -94.472)"
        {...addlProps}
      />
    ),
  },
  {
    path: (addlProps) => (
      <rect
        x="140.982"
        y="113.318"
        width="46.385"
        height="17.527"
        rx="3.4"
        {...addlProps}
      />
    ),
  },
  {
    path: (addlProps) => (
      <path
        d="M545.584,228.037V361.6s-13.6,10.828-25.282,13.145c-10.077,2-36.162,3.374-36.766-.857S478.9,239.117,545.584,228.037Z"
        transform="translate(-390.349 -94.472)"
        {...addlProps}
      />
    ),
  },
  {
    path: (addlProps) => (
      <path
        d="M563.865,228.037V361.6s13.6,10.828,25.282,13.145c10.076,2,36.161,3.374,36.766-.857S630.546,239.117,563.865,228.037Z"
        transform="translate(-390.349 -94.472)"
        {...addlProps}
      />
    ),
  },
  {
    path: (addlProps) => (
      <path
        d="M550.973,228.188h8.914l.151,136.435s20.7,17.828,59.681,16.317c0,0-4.684,38.528-1.057,56.508s9.216,41.248,9.216,41.248-77.812,30.218-145.954-.151c0,0,9.67-35.96,9.972-58.321a167.6,167.6,0,0,0-4.23-39.888s37.924,5.439,62.1-15.713C549.764,364.623,550.52,228.188,550.973,228.188Z"
        transform="translate(-390.349 -94.472)"
        {...addlProps}
      />
    ),
  },
  {
    path: (addlProps) => (
      <path
        d="M523.223,230.857s-40.694,20.548-50.968,25.182-11.08,5.439-11.08,5.439,15.512,18.735,18.533,70.509C479.708,331.987,489.58,244.354,523.223,230.857Z"
        transform="translate(-390.349 -94.472)"
        {...addlProps}
      />
    ),
  },
  {
    path: (addlProps) => (
      <path
        d="M587.084,230.857s40.693,20.548,50.968,25.182,11.08,5.439,11.08,5.439S633.62,280.213,630.6,331.987C630.6,331.987,620.726,244.354,587.084,230.857Z"
        transform="translate(-390.349 -94.472)"
        {...addlProps}
      />
    ),
  },
  {
    path: (addlProps) => (
      <path
        d="M457.951,265.306s-12.49,14.706-13.5,29.613,1.813,82.194.6,95.691c0,0,15.512-1.209,22.16,3.022s9.872,4.23,9.872,4.23,3.223-32.232,1.41-53.385S467.823,277.393,457.951,265.306Z"
        transform="translate(-390.349 -94.472)"
        {...addlProps}
      />
    ),
  },
  {
    path: (addlProps) => (
      <path
        d="M444.655,394.639s3.627-1.209,8.864,1.612,21.153,4.835,21.153,4.835a241.987,241.987,0,0,1-6.245,50.968c-6.446,27.8-23.167,79.977-22.966,81.992,0,0-17.325-4.03-20.951-3.828,0,0,1.209-21.354,1.612-31.427s.2-42.91,6.648-63.659S444.454,396.049,444.655,394.639Z"
        transform="translate(-390.349 -94.472)"
        {...addlProps}
      />
    ),
  },
  {
    path: (addlProps) => (
      <path
        d="M423.5,533.844s-4.029,2.82-7.454,5.036-12.49,13.1-15.311,18.131-11.482,15.915-10.274,16.923,5.44.2,7.454-2.216,7.051-8.663,10.476-7.253c0,0,1.007,12.087-3.224,22.966s-4.633,13.7-4.633,13.7,2.591,2.22,7.063.809q.291-.091.592-.2s1.612,4.835.806,8.864,3.022,3.425,7.655,1.007,21.959-22.562,24.175-35.053,1.611-40.895,1.611-40.895S427.33,534.65,423.5,533.844Z"
        transform="translate(-390.349 -94.472)"
        {...addlProps}
      />
    ),
  },
  {
    path: (addlProps) => (
      <path
        d="M650.678,265.306s12.49,14.706,13.5,29.613-1.813,82.194-.6,95.691c0,0-15.512-1.209-22.16,3.022s-9.871,4.23-9.871,4.23-3.224-32.232-1.41-53.385S640.807,277.393,650.678,265.306Z"
        transform="translate(-390.349 -94.472)"
        {...addlProps}
      />
    ),
  },
  {
    path: (addlProps) => (
      <path
        d="M663.974,394.639s-3.626-1.209-8.864,1.612-21.153,4.835-21.153,4.835a242.066,242.066,0,0,0,6.245,50.968c6.447,27.8,23.168,79.977,22.966,81.992,0,0,17.325-4.03,20.951-3.828,0,0-1.208-21.354-1.611-31.427s-.2-42.91-6.648-63.659S664.175,396.049,663.974,394.639Z"
        transform="translate(-390.349 -94.472)"
        {...addlProps}
      />
    ),
  },
  {
    path: (addlProps) => (
      <path
        d="M685.127,533.844s4.029,2.82,7.453,5.036,12.491,13.1,15.311,18.131,11.483,15.915,10.274,16.923-5.439.2-7.454-2.216-7.051-8.663-10.475-7.253c0,0-1.008,12.087,3.223,22.966s4.633,13.7,4.633,13.7-2.59,2.22-7.062.809q-.291-.091-.593-.2s-1.612,4.835-.806,8.864-3.022,3.425-7.655,1.007-21.958-22.562-24.174-35.053-1.612-40.895-1.612-40.895S681.3,534.65,685.127,533.844Z"
        transform="translate(-390.349 -94.472)"
        {...addlProps}
      />
    ),
  },
  {
    path: (addlProps) => (
      <path
        d="M552.635,495.366s0,66.279-.6,69.9c-.051.277-.126.982-.2,2.065-5.691,6.673-27.473,28.254-58.673,9.04a10.164,10.164,0,0,1-1.738-1.309c-23.066-21.783-7.076-50.968-6.371-52.2l-2.216-1.234c-.176.327-17.652,32.107,6.849,55.249a14.16,14.16,0,0,0,2.166,1.662c9.519,5.842,18.232,8.033,25.988,8.033,16.116,0,27.977-9.519,33.642-15.235-1.661,20.07-6.144,82.369-6.5,86-.4,4.231-7.605,77.51-7.605,80.935,0,0-36.111-4.785-45.579-2.972,0,0,.2-37.672-2.821-59.63s-14.5-65.473-15.914-101.936-1.411-65.473,7.453-91.46C480.514,482.272,499.048,497.582,552.635,495.366Z"
        transform="translate(-390.349 -94.472)"
        {...addlProps}
      />
    ),
  },
  {
    path: (addlProps) => (
      <path
        d="M555.471,495.366s0,66.279.6,69.9c.051.277.126.982.2,2.065,5.691,6.673,27.473,28.254,58.673,9.04a10.164,10.164,0,0,0,1.738-1.309c23.066-21.783,7.076-50.968,6.371-52.2l2.216-1.234c.176.327,17.652,32.107-6.85,55.249a14.151,14.151,0,0,1-2.165,1.662c-9.519,5.842-18.232,8.033-25.988,8.033-16.116,0-27.977-9.519-33.643-15.235,1.662,20.07,6.145,82.369,6.5,86,.4,4.231,7.605,77.51,7.605,80.935,0,0,36.111-4.785,45.579-2.972,0,0-.2-37.672,2.82-59.63s14.5-65.473,15.915-101.936,1.41-65.473-7.453-91.46C627.592,482.272,609.058,497.582,555.471,495.366Z"
        transform="translate(-390.349 -94.472)"
        {...addlProps}
      />
    ),
  },
  {
    path: (addlProps) => (
      <path
        d="M492.2,739.529s21.354-2.418,42.909,3.425c0,0,3.627,43.312,1.612,61.846s-7.655,75.445-6.849,80.078c0,0-19.944.907-25.988,2.518,0,0-2.619-29.009-9.267-49.154S486.961,754.839,492.2,739.529Z"
        transform="translate(-390.349 -94.472)"
        {...addlProps}
      />
    ),
  },
  {
    path: (addlProps) => (
      <path
        d="M617.088,739.529s-21.354-2.418-42.909,3.425c0,0-3.626,43.312-1.612,61.846s7.655,75.445,6.85,80.078c0,0,19.944.907,25.987,2.518,0,0,2.619-29.009,9.267-49.154S622.326,754.839,617.088,739.529Z"
        transform="translate(-390.349 -94.472)"
        {...addlProps}
      />
    ),
  },
  {
    path: (addlProps) => (
      <path
        d="M504.387,891.023s17.728-.806,24.879-2.619c0,0,2.015,6.245,1.209,18.131s-1.007,21.555-.6,23.771,1.813,9.67-1.209,15.512S520,967.172,516.978,972.007s-10.275,5.439-11.886-1.611c0,0-1.813,3.424-7.857,1.41s-9.67-1.209-11.483-5.44-4.835-11.684-1.41-16.922,18.937-18.534,20.145-25.182S505.6,895.455,504.387,891.023Z"
        transform="translate(-390.349 -94.472)"
        {...addlProps}
      />
    ),
  },
  {
    path: (addlProps) => (
      <path
        d="M604.752,891.023s-17.728-.806-24.88-2.619c0,0-2.014,6.245-1.209,18.131s1.008,21.555.605,23.771-1.813,9.67,1.209,15.512,8.662,21.354,11.684,26.189,10.274,5.439,11.886-1.611c0,0,1.813,3.424,7.856,1.41s9.67-1.209,11.483-5.44,4.835-11.684,1.41-16.922-18.936-18.534-20.145-25.182S603.543,895.455,604.752,891.023Z"
        transform="translate(-390.349 -94.472)"
        {...addlProps}
      />
    ),
  },
];
export default function PressureSore() {
  const [selected, setSelected] = useState();
  return (
    <div className="mx-auto flex max-w-2xl justify-center">
      <svg
        className=" h-screen py-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 327.931 881.194"
      >
        {parts.map((part, renderIndex) => {
          const Path = part.path;
          return (
            <Path
              key={renderIndex}
              className={
                selected === renderIndex
                  ? "text-blue-500"
                  : "text-secondary-300  hover:text-blue-400"
              }
              fill="currentColor"
              onClick={(_) => setSelected(renderIndex)}
            />
          );
        })}
      </svg>
    </div>
  );
}
