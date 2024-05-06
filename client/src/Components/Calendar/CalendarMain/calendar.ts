export interface ModalWindowProps {
  dayItem: moment.Moment;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  HandleAddEvent: (formData: FormData, dayItem: moment.Moment) => void;
}

export interface inputTypes {
  title: string;
  description: string;
  category: string;
  cost: number;
}

export interface FormData {
  title: string;
  category: string;
  description: string;
}
