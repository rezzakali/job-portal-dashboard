import { RootState } from '@/app/store';
import ChipComponent from '@/ui/ChipComponent';
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from '@material-tailwind/react';
import React, { SetStateAction } from 'react';
import { FiFile } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ApplicantsModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { selectedApplication } = useSelector(
    (state: RootState) => state.applications
  );

  return (
    <Dialog size="sm" open={open} handler={() => setOpen(false)}>
      <DialogHeader className="justify-between">
        <Typography className="font-medium capitalize">Applicants</Typography>
        <Typography>
          <MdClose
            className="w-5 h-5 cursor-pointer text-gray-700 hover:text-gray-800"
            onClick={() => setOpen(false)}
          />
        </Typography>
      </DialogHeader>
      <DialogBody
        className="max-h-[450px] overflow-y-scroll"
        id="custom-scrollbar"
      >
        {selectedApplication &&
          selectedApplication.applicants?.map((applicant, index) => {
            const { email, phone, resume, status } = applicant;
            return (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-200 rounded mb-2 p-3"
              >
                <div>
                  <Typography variant="small">Email : {email}</Typography>
                  <Typography variant="small">Phone : {phone}</Typography>
                </div>
                <div className="flex items-center gap-x-4">
                  <ChipComponent status={status} />

                  <Link
                    to={resume}
                    target="_blank"
                    className="w-5 h-5 cursor-pointer"
                  >
                    <FiFile className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            );
          })}
      </DialogBody>
      <DialogFooter>
        <span></span>
      </DialogFooter>
    </Dialog>
  );
};

export default ApplicantsModal;
