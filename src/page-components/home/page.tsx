import { JobListInternalResponseDto, JobListInternalStatus } from "@/lib/api/interfaces/common.interface";
import {
  useJobsInternalcreate,
  useJobsInternalcreationEntities,
  useJobsInternalcreationEntitiesWithFoundOrganization,
  useJobsInternalfind,
  useJobsInternalfindInitial,
} from "@/lib/api/requests/jobs.requests";
import { Badge } from "@/ui-components/ui/badge";
import { Button } from "@/ui-components/ui/button";
import { Card, CardContent } from "@/ui-components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui-components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui-components/ui/form";
import { Input } from "@/ui-components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui-components/ui/select";
import { SuspenseWrapper } from "@/ui-components/ui/suspense-wrapper";
import { Textarea } from "@/ui-components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Calendar, Filter, Plus, Search, Star, User } from "lucide-react";
import { startTransition, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Zod schema for validation
const createJobSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().min(1, "Description is required").max(1000, "Description must be less than 1000 characters"),
  belongsToOrganizationId: z.string().min(1, "Organization is required"),
  belongsToCustomerUserId: z.string().min(1, "Customer user is required"),
});

type CreateJobFormData = z.infer<typeof createJobSchema>;

// Search parameters interface
interface SearchParams {
  textSearch?: string;
  statusFilter?: "ALL" | "NEW" | "ACTIVE" | "DONE";
  page?: number;
  limit?: number;
}

// Status badge component
const StatusBadge = ({ status }: { status: JobListInternalStatus }) => {
  const getStatusVariant = (status: JobListInternalStatus) => {
    switch (status) {
      case JobListInternalStatus.NEW:
        return "default";
      case JobListInternalStatus.ACTIVE:
        return "secondary";
      case JobListInternalStatus.FEEDBACK:
        return "outline";
      case JobListInternalStatus.DONE:
        return "secondary";
      default:
        return "outline";
    }
  };

  return <Badge variant={getStatusVariant(status)}>{status}</Badge>;
};

// Job card component
const JobCard = ({ job }: { job: JobListInternalResponseDto }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
              <StatusBadge status={job.status} />
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{job.belongsToCustomerUserFullName}</span>
              </div>

              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span>{job.belongsToOrganizationName}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(job.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-sm font-medium text-gray-500">#{job.jobIncrementId}</span>
              {job.rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{job.rating}</span>
                </div>
              )}
            </div>
          </div>

          {job.profilePictureUrl && (
            <img src={job.profilePictureUrl} alt="Profile" className="h-10 w-10 rounded-full object-cover ml-4" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const CreateJobDialog = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateJobFormData) => void;
  isSubmitting: boolean;
}) => {
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<string>("");

  const form = useForm<CreateJobFormData>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      title: "",
      description: "",
      belongsToOrganizationId: "",
      belongsToCustomerUserId: "",
    },
  });

  const handleClose = () => {
    form.reset();
    setSelectedOrganizationId("");
    onClose();
  };

  const handleFormSubmit = (data: CreateJobFormData) => {
    onSubmit(data);
    form.reset();
    setSelectedOrganizationId("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Job</DialogTitle>
        </DialogHeader>

        {isOpen && (
          <SuspenseWrapper type="blue">
            <CreateJobForm
              form={form}
              selectedOrganizationId={selectedOrganizationId}
              setSelectedOrganizationId={setSelectedOrganizationId}
              onSubmit={handleFormSubmit}
              onCancel={handleClose}
              isSubmitting={isSubmitting}
            />
          </SuspenseWrapper>
        )}
      </DialogContent>
    </Dialog>
  );
};

const CreateJobForm = ({
  form,
  selectedOrganizationId,
  setSelectedOrganizationId,
  onSubmit,
  onCancel,
  isSubmitting,
}: {
  form: any;
  selectedOrganizationId: string;
  setSelectedOrganizationId: (id: string) => void;
  onSubmit: (data: CreateJobFormData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}) => {
  // These hooks will only be called when the dialog is actually open
  const { data: creationEntities } = useJobsInternalcreationEntities();
  const { data: customerUsersData } = useJobsInternalcreationEntitiesWithFoundOrganization(
    selectedOrganizationId || ""
  );

  // Watch for organization changes in the form
  const watchedOrganizationId = form.watch("belongsToOrganizationId");

  // Update selected organization when form value changes
  useEffect(() => {
    if (watchedOrganizationId && watchedOrganizationId !== selectedOrganizationId) {
      setSelectedOrganizationId(watchedOrganizationId);
      // Reset customer user selection when organization changes
      form.setValue("belongsToCustomerUserId", "");
    }
  }, [watchedOrganizationId, selectedOrganizationId, form, setSelectedOrganizationId]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter job title" disabled={isSubmitting} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter job description" disabled={isSubmitting} rows={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="belongsToOrganizationId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an organization" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {creationEntities?.organizations?.map((org) => (
                    <SelectItem key={org._id} value={org._id}>
                      {org.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="belongsToCustomerUserId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer User</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isSubmitting || !selectedOrganizationId}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={!selectedOrganizationId ? "Select an organization first" : "Select a customer user"}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {customerUsersData?.customerUsers?.map((user) => (
                    <SelectItem key={user._id} value={user._id}>
                      {user.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? "Creating..." : "Create Job"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

// Main jobs page component
const JobsPage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<string>("");
  const [searchParams, setSearchParams] = useState<SearchParams>({
    limit: 20,
    page: 1,
    statusFilter: "ALL",
  });
  const [searchInput, setSearchInput] = useState("");
  const [hasChangedFromInitial, setHasChangedFromInitial] = useState(false);

  // Initial fetch to get organizations and initial data
  const { data: initial, isLoading: isInitialLoading } = useJobsInternalfindInitial({
    organizationId: "67191acf43e9a72441be59cf",
  });

  // Set the default organization from initial response
  useEffect(() => {
    if (initial?.filterSelectableEntities?.organizationsFilterUsed && !selectedOrganizationId) {
      setSelectedOrganizationId(initial.filterSelectableEntities.organizationsFilterUsed.toString());
    }
  }, [initial, selectedOrganizationId]);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchInput.length >= 4 || searchInput.length === 0) {
        startTransition(() => {
          setSearchParams((prev) => ({
            ...prev,
            textSearch: searchInput || undefined,
            page: 1, // Reset to first page when searching
          }));
          setHasChangedFromInitial(true);
        });
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  // Always call the find hook since it's a suspense query, but only use the result when needed
  const findResult = useJobsInternalfind({
    ...searchParams,
    organizationId: selectedOrganizationId || "67191acf43e9a72441be59cf",
  });

  // Use initial data if we haven't made changes, otherwise use find result
  const data = hasChangedFromInitial ? findResult?.data : initial;
  const isLoading = hasChangedFromInitial ? findResult?.isLoading : isInitialLoading;

  const createJobMutation = useJobsInternalcreate();

  const handleCreateJob = async (formData: CreateJobFormData) => {
    try {
      await createJobMutation.mutateAsync(formData);
      setIsCreateDialogOpen(false);
      // Refresh data after creating
      if (hasChangedFromInitial) {
        findResult?.refetch?.();
      } else {
        // If we're still on initial data, force a refresh by setting hasChangedFromInitial
        setHasChangedFromInitial(true);
      }
    } catch (error) {
      console.error("Failed to create job:", error);
    }
  };

  const handleStatusFilter = (status: "ALL" | "NEW" | "ACTIVE" | "DONE") => {
    startTransition(() => {
      setSearchParams((prev) => ({
        ...prev,
        statusFilter: status,
        page: 1,
      }));
      setHasChangedFromInitial(true);
    });
  };

  const handlePageChange = (page: number) => {
    startTransition(() => {
      setSearchParams((prev) => ({
        ...prev,
        page,
      }));
      setHasChangedFromInitial(true);
    });
  };

  const handleOrganizationChange = (organizationId: string) => {
    startTransition(() => {
      setSelectedOrganizationId(organizationId);
      setSearchParams((prev) => ({
        ...prev,
        page: 1, // Reset to first page when changing organization
      }));
      setHasChangedFromInitial(true);
    });
  };

  const handleCreateJobClick = () => {
    startTransition(() => {
      setIsCreateDialogOpen(true);
    });
  };

  // Available status filters from API response
  const statusFilters = initial?.filterSelectableEntities?.statusFilter || [];

  // Available organizations
  const availableOrganizations = initial?.filterSelectableEntities?.organizations || [];

  // Helper function to get a more user-friendly label for the status
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ALL":
        return "All Jobs";
      case "NEW":
        return "New";
      case "ACTIVE":
        return "Active";
      case "DONE":
        return "Done";
      default:
        return status;
    }
  };

  // Show loading if we don't have initial data, or if we're using find hook and it's loading
  if (isLoading || !selectedOrganizationId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Jobs</h1>
            <p className="mt-2 text-gray-600">Manage and track all internal jobs ({data?.jobs?.count || 0} total)</p>
          </div>
          <Button onClick={handleCreateJobClick}>
            <Plus className="h-4 w-4 mr-2" />
            Create Job
          </Button>
        </div>

        {/* Organization Selection */}
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Organization:</span>
            </div>
            <Select value={selectedOrganizationId} onValueChange={handleOrganizationChange}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select an organization" />
              </SelectTrigger>
              <SelectContent>
                {availableOrganizations.map((org) => (
                  <SelectItem key={org._id} value={org._id}>
                    {org.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          {/* Search Input */}
          <div className="flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search jobs... (min 4 characters)"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Status Filters */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Status:</span>
            <div className="flex gap-2">
              {statusFilters.map((filter) => (
                <Button
                  key={filter}
                  variant={searchParams.statusFilter?.toString() === filter.toString() ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleStatusFilter(filter as any)}
                >
                  {getStatusLabel(filter)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Jobs Grid */}
        {data?.jobs?.docs?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.jobs.docs.map((job) => (
              <JobCard key={job._id} job={job as unknown as JobListInternalResponseDto} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m0 0V9a2 2 0 012-2h2m0 0V6a2 2 0 012-2h.01M6 20h2m0 0v-1a2 2 0 012-2h2m2 2a2 2 0 002 2v1m2-6h2"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-4">
              {searchInput || searchParams.statusFilter !== "ALL"
                ? "Try adjusting your search criteria or filters."
                : "Get started by creating your first job."}
            </p>
            {!searchInput && searchParams.statusFilter === "ALL" && (
              <Button onClick={handleCreateJobClick}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Job
              </Button>
            )}
          </div>
        )}

        {/* Pagination */}
        {data?.jobs?.pageCount > 1 && (
          <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
            <div className="text-sm text-gray-700">
              Showing page {data.jobs.page} of {data.jobs.pageCount} ({data.jobs.count} total jobs)
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(data.jobs.page - 1)}
                disabled={data.jobs.page <= 1}
              >
                Previous
              </Button>
              <span className="px-3 py-2 text-sm font-medium text-gray-700">
                Page {data.jobs.page} of {data.jobs.pageCount}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(data.jobs.page + 1)}
                disabled={data.jobs.page >= data.jobs.pageCount}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Create Job Dialog */}
      <CreateJobDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateJob}
        isSubmitting={createJobMutation.isPending}
      />
    </div>
  );
};

export default JobsPage;
