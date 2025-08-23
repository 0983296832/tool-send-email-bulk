/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Calendar, UploadCloud, XCircle } from "lucide-react";
import { toast } from "sonner";

export default function ExcelUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState<number | null>(1);
  const [month, setMonth] = useState<string>(() => {
    const m = new Date().getMonth() + 1;
    return String(m).padStart(2, "0");
  });
  const [subjects, setSubjects] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewName, setPreviewName] = useState<string>("");

  // Progress state
  const [progress, setProgress] = useState<number>(0);
  const xhrRef = useRef<XMLHttpRequest | null>(null);

  function validate() {
    const e: Record<string, string> = {};
    if (!file) e.file = "Vui lòng chọn file Excel.";
    else if (
      ["", undefined].includes(file.type) === false &&
      ![
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ].includes(file.type)
    ) {
      const ext = file.name.split(".").pop()?.toLowerCase() || "";
      if (!["xlsx", "xls"].includes(ext))
        e.file = "File phải là Excel (.xlsx/.xls).";
    }
    if (type == null || ![1, 2, 3].includes(Number(type)))
      e.type = "Chọn type (1 | 2 | 3).";
    const mn = Number(month);
    if (!Number.isInteger(mn) || mn < 1 || mn > 12)
      e.month = "Tháng không hợp lệ (1..12).";
    if (!subjects || subjects.trim().length === 0)
      e.subjects = "Tiêu đề không được để trống.";
    if (subjects && subjects.length > 200)
      e.subjects = "Tiêu đề quá dài (tối đa 200 ký tự).";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // Hàm tải xuống
  const downloadFileFromBlob = (response: any, filename: string) => {
    const blob = new Blob([response], {
      type:
        response.type ||
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  function resetForm() {
    setFile(null);
    setPreviewName("");
    setSubjects("");
    setType(1);
    setMonth(String(new Date().getMonth() + 1).padStart(2, "0"));
    if (inputRef.current) inputRef.current.value = "";
    setProgress(0);
    setErrors({});
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const fd = new FormData();
    if (file) fd.append("file", file);
    fd.append("type", String(type));
    fd.append("month", String(Number(month)));
    fd.append("subjects", subjects);

    // Use XMLHttpRequest to get reliable upload progress events
    const xhr = new XMLHttpRequest();
    xhrRef.current = xhr;

    setLoading(true);
    setProgress(0);

    xhr.upload.onprogress = (evt) => {
      if (evt.lengthComputable) {
        const pct = Math.round((evt.loaded / evt.total) * 100);
        setProgress(pct);
      }
    };

    xhr.onreadystatechange = () => {
      console.log(xhr);
      if (xhr.readyState === XMLHttpRequest.DONE) {
        setLoading(false);
        try {
          if (xhr.status >= 200 && xhr.status < 300) {
            setProgress(100);
            // gọi hàm tải xuống với response
            downloadFileFromBlob(
              xhr.response,
              `ket_qua_${new Date().toISOString().slice(0, 10)}.xlsx`
            );
            resetForm();
            toast.success("Gửi mail thành công!", {
              classNames: { icon: "text-green-500" },
            });
            resetForm();
          } else {
            toast.error("Lỗi: " + `Upload thất bại (${xhr.status})`, {
              classNames: { icon: "text-red-500" },
            });
          }
        } catch (err) {
          toast.error("Lỗi không xác định từ server", {
            classNames: { icon: "text-red-500" },
          });
        }
      }
    };

    xhr.open("POST", "/api/send-email", true);
    xhr.send(fd);
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setPreviewName(f?.name ?? "");
    setErrors({ ...errors, file: "" });
  }

  function cancelUpload() {
    if (xhrRef.current && loading) {
      xhrRef.current.abort();
      setLoading(false);
      setProgress(0);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card className="overflow-visible">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Gửi email hàng loạt - Upload Excel
          </CardTitle>
          <CardDescription>
            Chọn file Excel chứa danh sách, cấu hình loại /tháng /chủ đề rồi gửi
            lên server.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-4">
            {/* File */}
            <div>
              <Label className="mb-1">File Excel</Label>
              <input
                ref={inputRef}
                type="file"
                accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                onChange={onFileChange}
                className={cn(
                  "block w-full text-sm file:border-0 file:bg-transparent file:cursor-pointer file:underline file:underline-offset-2",
                  errors.file ? "border-red-500" : "border-slate-200"
                )}
                disabled={loading}
              />
              {previewName && (
                <p className="text-sm text-muted-foreground mt-1">
                  Đã chọn: {previewName}
                </p>
              )}
              {errors.file && (
                <p className="text-sm text-red-600 mt-1">{errors.file}</p>
              )}
            </div>

            {/* Type + Month */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-1">Type</Label>
                <Select
                  onValueChange={(v) => setType(Number(v))}
                  defaultValue={String(type ?? 1)}
                  disabled={loading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Đến hạn</SelectItem>
                    <SelectItem value="2">2 - Quá hạn</SelectItem>
                    <SelectItem value="3">3 - Vi phạm quá hạn</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-sm text-red-600 mt-1">{errors.type}</p>
                )}
              </div>

              <div>
                <Label className="mb-1">Tháng</Label>
                <Input
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  maxLength={2}
                  disabled={loading}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Mặc định là tháng hiện tại ({new Date().getMonth() + 1})
                </p>
                {errors.month && (
                  <p className="text-sm text-red-600 mt-1">{errors.month}</p>
                )}
              </div>
            </div>

            {/* Subjects */}
            <div>
              <Label className="mb-1">Tiêu đề (subjects)</Label>
              <Textarea
                value={subjects}
                onChange={(e) => {
                  setErrors({ ...errors, subjects: "" });
                  setSubjects(e.target.value);
                }}
                rows={3}
                disabled={loading}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Tối đa 200 ký tự.
              </p>
              {errors.subjects && (
                <p className="text-sm text-red-600 mt-1">{errors.subjects}</p>
              )}
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Tiến độ tải lên</Label>
                <span className="text-sm text-muted-foreground">
                  {progress}%
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                Bạn có thể upload file .xlsx hoặc .xls
              </div>
              <div className="flex items-center gap-2">
                {!loading ? (
                  <Button type="button" variant="ghost" onClick={resetForm}>
                    Reset
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={cancelUpload}
                  >
                    <XCircle className="h-4 w-4 mr-1" /> Huỷ
                  </Button>
                )}
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <span className="inline-flex items-center">
                      <UploadCloud className="h-4 w-4 mr-2" />
                      Đang gửi...
                    </span>
                  ) : (
                    <span className="inline-flex items-center">
                      <UploadCloud className="h-4 w-4 mr-2" />
                      Gửi
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
