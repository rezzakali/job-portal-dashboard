import { RootState } from '@/app/store';
import {
  Chip,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from '@material-tailwind/react';
import React, { SetStateAction } from 'react';
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';

const DetailsModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { selectedJob } = useSelector((state: RootState) => state.jobs);

  const {
    title,
    experienceLevel,
    employementType,
    skills,
    description,
    createdBy,
  } = selectedJob || {};

  return (
    <Dialog open={open} handler={() => setOpen(false)}>
      <DialogHeader className="justify-between">
        <Typography className="font-medium capitalize">Job Details</Typography>
        <Typography>
          <MdClose
            className="w-5 h-5 cursor-pointer text-gray-700 hover:text-gray-800"
            onClick={() => setOpen(false)}
          />
        </Typography>
      </DialogHeader>
      <DialogBody className="space-y-3">
        <Typography>
          <span className="font-semibold text-black">Job title : </span>
          {title}
        </Typography>
        <Typography>
          <span className="font-semibold text-black">Experience : </span>
          {experienceLevel}
        </Typography>
        <Typography>
          <span className="font-semibold text-black">Employement Type : </span>
          {employementType}
        </Typography>
        <Typography>
          <span className="font-semibold text-black">Created By :</span>{' '}
          {createdBy?.email}
        </Typography>
        <Typography as={'div'} className="flex items-center gap-1 flex-wrap">
          <span className="font-semibold text-black">Skills : </span>{' '}
          {skills?.map((skill, index) => (
            <Chip
              value={skill}
              variant="outlined"
              color="blue-gray"
              key={index}
              className="rounded-full mx-0.5 capitalize"
              size="sm"
            />
          ))}
        </Typography>
        <Typography>
          <span className="font-semibold text-black">Description : </span>
          {description}
        </Typography>
      </DialogBody>
      <DialogFooter>
        <span></span>
      </DialogFooter>
    </Dialog>
  );
};

export default DetailsModal;
