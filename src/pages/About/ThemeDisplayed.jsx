import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Container from "@/components/Container";
import { useNotification } from "@/hooks/UseNotification";
const ThemeDisplayed = () => {
  const { triggerToast } = useNotification();

  return (
    <>
      <Container className="m-0 mx-auto flex flex-col justify-center p-0 md:p-8">
        <div className="flex gap-2 flex-wrap my-5 ">
          <Button variant={"accent"}>accent variant btn</Button>
          <Button>default variant btn</Button>
          <Button variant={"accentNegative"}>
            accent negative variant btn
          </Button>
          <Button variant={"destructive"}>destructive variant btn</Button>
          <Button variant={"submit"} size={"lg"}>
            submit variant btn
          </Button>
          <Button variant={"grey"} size={"lg"}>
            grey variant btn
          </Button>
          //
          <Button variant={"accent"}>carrot</Button>
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div className="text-foreground bg-background">
            bg-background text-foreground
          </div>
          <div className="text-card-foreground bg-card">
            bg-card text-card-foreground
          </div>
          <div className="text-popover-foreground bg-popover">
            bg-popover text-popover-foreground
          </div>
          <div className="text-primary-foreground bg-primary">
            bg-primary text-primary-foreground
          </div>
          <div className="text-secondary-foreground bg-secondary">
            bg-secondary text-secondary-foreground
          </div>
          <div className="text-tertiary-foreground bg-tertiary">
            bg-tertiary text-tertiary-foreground
          </div>
          <div className="text-muted-foreground bg-muted">
            bg-muted text-muted-foreground
          </div>
          <div className="text-accent-foreground bg-accent">
            bg-accent text-accent-foreground
          </div>
          <div className="text-accent-negative-foreground bg-accent-negative">
            bg-accent-negative text-accent-negative-foreground
          </div>
          <div className="text-destructive-foreground bg-destructive">
            bg-destructive text-destructive-foreground
          </div>
          {/* <div className="text-border bg-border">bg-border text-border</div>
              <div className="text-input bg-input">bg-input text-input</div>
              <div className="text-ring bg-ring">bg-ring text-ring</div>
              <div className="text-chart-1 bg-chart-1">bg-chart-1 text-chart-1</div>
              <div className="text-chart-2 bg-chart-2">bg-chart-2 text-chart-2</div>
              <div className="text-chart-3 bg-chart-3">bg-chart-3 text-chart-3</div>
              <div className="text-chart-4 bg-chart-4">bg-chart-4 text-chart-4</div>
              <div className="text-chart-5 bg-chart-5">bg-chart-5 text-chart-5</div>
              <div className="text-sidebar-foreground bg-sidebar">bg-sidebar text-sidebar-foreground</div>
              <div className="text-sidebar-primary-foreground bg-sidebar-primary">bg-sidebar-primary text-sidebar-primary-foreground</div>
              <div className="text-sidebar-accent-foreground bg-sidebar-accent">bg-sidebar-accent text-sidebar-accent-foreground</div>
              <div className="text-sidebar-border bg-sidebar-border">bg-sidebar-border text-sidebar-border</div>
              <div className="text-sidebar-ring bg-sidebar-ring">bg-sidebar-ring text-sidebar-ring</div> */}
        </div>
        <div className="w-full ] bg-primary rounded-sm my-2">
          <h1>в основному використовуйте ці змінні:</h1>
          <p>bg-background text-foreground </p>
          <p>bg-primary text-primary-foreground </p>
          <p>bg-secondary text-secondary-foreground </p>
          <p>bg-tertiary text-tertiary-foreground</p>
          <p>bg-accent text-accent-foreground</p>
          <p>bg-accent-negative text-accent-negative-foreground</p>
          <p>
            bg-popover text-popover-foreground і bg-card text-card-foreground -{" "}
            <strong>
              це дефолтні змінні які встановлюються разом з shadcn, я їх не
              змінював
            </strong>
          </p>
          <p>margin і padding дивіться в figma</p>
        </div>
        <div className="w-full h-[100px] bg-primary rounded-sm my-2">
          <h1>rounded-sm </h1>
        </div>
        <div className="w-full h-[100px] bg-primary rounded-lg my-2 ">
          <h2>rounded-lg </h2>
        </div>
        <div className="w-full h-[100px] bg-primary rounded-sm my-2">
          <h1> h1 </h1>
        </div>
        <div className="w-full h-[100px] bg-primary rounded-lg my-2 ">
          <h2>h2</h2>
        </div>
        <div className="w-full h-[100px] bg-primary rounded-sm my-2">
          <h3>h3</h3>
        </div>
        <div className="w-full h-[100px] bg-primary rounded-lg my-2 ">
          <h4>h4</h4>
        </div>
        <div className="w-full h-[100px] bg-primary rounded-sm my-2">
          <h5> h5</h5>
        </div>
        <div className="w-full h-[100px] bg-primary rounded-lg my-2 ">
          <h6> h6</h6>
        </div>
        <div className="w-full h-[100px] bg-primary rounded-lg my-2 ">
          <p> p</p>
        </div>
        <div className="w-full h-[100px] bg-primary rounded-lg my-2 ">
          <a> a</a>
        </div>
        <div className="w-full h-[100px] bg-primary rounded-lg my-2 ">
          <span>span</span>
        </div>
        <div className="w-full h-[100px] bg-primary rounded-lg my-2 ">
          <p> p</p>
        </div>
        <div className="bg-primary p-10 rounded-lg my-5">
          <AlertDialog>
            <AlertDialogTrigger className="bg-button text-white text-sm rounded-xl px-5 py-1">
              Open alert dialog
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Textarea placeholder="text area" />

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>

          <Dialog>
            <DialogTrigger>Open dialog</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Input />

          <Drawer>
            <DrawerTrigger>Open drawer</DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                  <DrawerDescription>
                    This action cannot be undone.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <Button variant="submit">Submit</Button>
                  <DrawerClose>
                    <Button
                      variant="outline"
                      className={"text-secondary hover:text-secondary/80"}
                    >
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>

          <Button
             onClick={() =>
              triggerToast("Profile updated successfully!", "success", "/profile")
            }
          >
            Show Success Toast
          </Button>
          <Button
             onClick={() =>
              triggerToast("Message of the error here!", "error")
            }
          >
            Show error Toast
          </Button>
        </div>
      </Container>
    </>
  );
};

export default ThemeDisplayed;
