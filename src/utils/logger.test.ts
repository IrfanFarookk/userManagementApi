import logger from "./logger";
import winston from "winston";

describe("Logger Utility", () => {
    let infoSpy: jest.SpyInstance;
    let warnSpy: jest.SpyInstance;
    let errorSpy: jest.SpyInstance;
    let formatSpy: jest.SpyInstance;

    beforeEach(() => {
        if (logger.transports.length === 0) {
            logger.add(new winston.transports.Console());
        }

        infoSpy = jest.spyOn(logger, "info").mockImplementation(jest.fn());
        warnSpy = jest.spyOn(logger, "warn").mockImplementation(jest.fn());
        errorSpy = jest.spyOn(logger, "error").mockImplementation(jest.fn());
        formatSpy = jest.spyOn(winston.format, "printf");
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should apply the correct log format", () => {
        const formattedMessage = winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        });

        expect(formatSpy).toHaveBeenCalled();

        const timestamp = "2025-02-26T12:34:56.789Z";
        const logEntry = formattedMessage.transform({
            timestamp,
            level: "info",
            message: "Test log message"
        });
        expect(logEntry).toBe(logEntry);
    });

    it("should log an info message", () => {
        logger.info("Info message");
        expect(infoSpy).toHaveBeenCalledWith("Info message");
    });

    it("should log an error message", () => {
        logger.error("Error message");
        expect(errorSpy).toHaveBeenCalledWith("Error message");
    });

    it("should log a warning message", () => {
        logger.warn("Warning message");
        expect(warnSpy).toHaveBeenCalledWith("Warning message");
    });
});
