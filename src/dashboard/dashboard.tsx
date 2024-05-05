import * as React from 'react';
import StarRatings from 'react-star-ratings';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./../components/ui/table";
import { CheckIcon, TrashIcon, Cross1Icon } from '@radix-ui/react-icons';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./../components/ui/select";
import { Button } from '../components/ui/button';
import AuthService from '../services/authService';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [interviews, setInterviews] = React.useState([
    {
      name: "John Doe",
      interviewStatus: "Scheduled",
      interviewFeedback: "",
      rating: 3,
      _id: "1"
    },
  ]);

  useEffect(() => {
    const fetchCandidates = async () => {
      AuthService.getCandidates().then((res) => {
        console.log(res?.data?.data.candidates);
        setInterviews(res?.data?.data.candidates || []);
      });
    };
    fetchCandidates(); 
  }, []);

  const [newInterview, setNewInterview] = React.useState({
    name: "",
    interviewStatus: "",
    interviewFeedback: "",
    rating: 0,
  });

  const [addingInterview, setAddingInterview] = React.useState(false);
  const [isNameFilled, setIsNameFilled] = React.useState(true);
  const [isStatusFilled, setIsStatusFilled] = React.useState(true);
  const [isFeedbackFilled, setIsFeedbackFilled] = React.useState(true);

  const handleAddRow = () => {
    setAddingInterview(true);
  };
  const handleDelete = (candidateId:string) => {
    AuthService.deleteCandidate(candidateId).then(() => {
      setInterviews(interviews.filter(candidate => candidate._id !== candidateId));
    }).catch(error => {
      console.error('Error deleting candidate:', error);
    });
  };
  const handleCancelAdd = () => {
    setAddingInterview(false);
    resetForm();
  };

  const handleSaveInterview = () => {
    if (!newInterview.name || !newInterview.interviewStatus || !newInterview.interviewFeedback) {
      if (!newInterview.name) setIsNameFilled(false);
      if (!newInterview.interviewStatus) setIsStatusFilled(false);
      if (!newInterview.interviewFeedback) setIsFeedbackFilled(false);
      return;
    }

    setIsNameFilled(true);
    setIsStatusFilled(true);
    setIsFeedbackFilled(true);

    AuthService.addCandidate(newInterview).then(() => {
      AuthService.getCandidates().then((res) => {
        setInterviews(res?.data.data.candidates);
      });
    });

    resetForm();
    setAddingInterview(false);
  };

  const resetForm = () => {
    setNewInterview({
      name: "",
      interviewStatus: "",
      interviewFeedback: "",
      rating: 0,
    });
  };

  const navigate = useNavigate();
  const logout=()=>{
     localStorage.clear()
     navigate('/login')
  }

  return (
    <div>
       <Button onClick={logout}>Logout</Button>
      {!addingInterview && <Button onClick={handleAddRow}>Add Interview</Button>}
      <Table>
        <TableCaption>A list of recent interviews.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Interview Status</TableHead>
            <TableHead>Interview Feedback</TableHead>
            <TableHead className="text-right">Rating</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {interviews.map((interview, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{interview.name}</TableCell>
              <TableCell>
              <Select
                  value={interview.interviewStatus}
                  onValueChange={(value: string) => setNewInterview({ ...newInterview, interviewStatus: value })}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Interview Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value={interview.interviewStatus}>{interview.interviewStatus}</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>{interview.interviewFeedback}</TableCell>
              <TableCell className="text-right">
                <StarRatings
                  rating={interview.rating}
                  starRatedColor="blue"
                  numberOfStars={5}
                  starDimension="20px"
                  starSpacing="2px"
                />
              </TableCell>
              <TableCell className="text-right">
                <Button onClick={()=>handleDelete(interview._id)}><TrashIcon /></Button>
              </TableCell>
            </TableRow>
          ))}
          {/* Render new interview row if addingInterview is true */}
          {addingInterview && (
            <TableRow>
              <TableCell>
                <input
                  type="text"
                  placeholder="Name"
                  value={newInterview.name}
                  onChange={(e) => setNewInterview({ ...newInterview, name: e.target.value })}
                  className={!isNameFilled ? "red-border" : ""}
                />
              </TableCell>
              <TableCell>
              <Select
                  value={newInterview.interviewStatus}
                  onValueChange={(value: string) => setNewInterview({ ...newInterview, interviewStatus: value })}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Interview Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="On Hold">On Hold</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  placeholder="Interview Feedback"
                  value={newInterview.interviewFeedback}
                  onChange={(e) => setNewInterview({ ...newInterview, interviewFeedback: e.target.value })}
                  className={!isFeedbackFilled ? "red-border" : ""}
                />
              </TableCell>
              <TableCell>
                <StarRatings
                  rating={newInterview.rating}
                  starRatedColor="blue"
                  changeRating={(newRating: any) => setNewInterview({ ...newInterview, rating: newRating })}
                  numberOfStars={5}
                  starDimension="20px"
                  starSpacing="2px"
                />
              </TableCell>
              <TableCell>
                <Button onClick={handleSaveInterview}><CheckIcon /></Button>
                <Button onClick={handleCancelAdd}><Cross1Icon /></Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">Total Rating</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default Dashboard;
